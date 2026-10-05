import html2canvas from 'html2canvas-pro';
import { jsPDF } from 'jspdf';

/**
 * Intelligent Smart Page-Break spacer generator.
 * Identifies block-level cards, headings, and list items that would be cut in half
 * by the A4 page boundary (1123px at 96 DPI), and introduces a dynamic spacer to push
 * them cleanly to the start of the next page.
 */
export function applySmartPageBreaks(
  container: HTMLElement,
  pageHeightPx: number = 1123,
  topMarginPx: number = 28,
  bottomMarginPx: number = 28
): void {
  // 1. Remove any previously added PDF spacer elements
  const existingSpacers = container.querySelectorAll('[data-pdf-spacer="true"]');
  existingSpacers.forEach((s) => s.remove());

  // 2. Select breakable leaf content elements only (never parent containers)
  const selectors = [
    'h2',
    'h3',
    'article',
    'section > div > div',
    '[class*="space-y-"] > div',
    '.break-inside-avoid'
  ];

  const allFound = Array.from(container.querySelectorAll<HTMLElement>(selectors.join(', ')));

  // Filter out containers that enclose other selected elements to prevent duplicate spacing
  const leafBlocks = allFound.filter((el) => {
    return !allFound.some((other) => other !== el && el.contains(other));
  });

  const containerRect = container.getBoundingClientRect();

  // Sort blocks strictly by vertical position
  leafBlocks.sort((a, b) => {
    return (a.getBoundingClientRect().top - containerRect.top) - (b.getBoundingClientRect().top - containerRect.top);
  });

  // Single pass calculation from top to bottom
  for (const block of leafBlocks) {
    if (block.offsetHeight <= 0) continue;

    const curContainerRect = container.getBoundingClientRect();
    const blockRect = block.getBoundingClientRect();
    const relativeTop = blockRect.top - curContainerRect.top;
    const blockHeight = blockRect.height;

    const usablePageHeight = pageHeightPx - topMarginPx - bottomMarginPx;
    if (blockHeight >= usablePageHeight) {
      continue;
    }

    const currentPageIndex = Math.floor(relativeTop / pageHeightPx);
    const pageBottomLimit = (currentPageIndex + 1) * pageHeightPx - bottomMarginPx;

    const isHeading = block.tagName === 'H2' || block.tagName === 'H3';
    const effectiveBottom = relativeTop + blockHeight + (isHeading ? 36 : 0);

    if (effectiveBottom > pageBottomLimit) {
      const nextPageTop = (currentPageIndex + 1) * pageHeightPx + topMarginPx;
      const neededSpacer = nextPageTop - relativeTop;

      if (neededSpacer > 0 && neededSpacer < pageHeightPx) {
        const spacer = document.createElement('div');
        spacer.style.height = `${Math.ceil(neededSpacer)}px`;
        spacer.style.width = '100%';
        spacer.style.display = 'block';
        spacer.style.clear = 'both';
        spacer.setAttribute('data-pdf-spacer', 'true');

        block.parentNode?.insertBefore(spacer, block);
      }
    }
  }
}

/**
 * High-fidelity, publication-grade PDF generator.
 * Uses html2canvas-pro to accurately render modern Tailwind CSS (including OKLCH/OKLAB colors,
 * Flexbox, CSS Grid, borders, and SVGs) without modifying the live application UI.
 */
export async function generatePDFFromElement(
  element: HTMLElement,
  fullName: string = 'My'
): Promise<void> {
  if (!element) {
    throw new Error('Element for PDF generation not found');
  }

  // 1. Wait for document fonts to finish loading
  if (document.fonts && document.fonts.ready) {
    try {
      await document.fonts.ready;
    } catch {
      // Ignore font readiness errors
    }
  }

  // Sanitize filename
  const cleanName = fullName.trim().replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '_');
  const filename = `${cleanName || 'CV'}_CV.pdf`;

  // 2. Create an isolated offscreen render sandbox behind the view
  // Fixed at 0, 0, width 794px (exact A4 width at 96 DPI), with opacity 1 (not 0, so html2canvas renders fully)
  const tempContainer = document.createElement('div');
  tempContainer.id = 'pdf-render-sandbox';
  tempContainer.style.position = 'fixed';
  tempContainer.style.left = '0';
  tempContainer.style.top = '0';
  tempContainer.style.width = '794px';
  tempContainer.style.zIndex = '-99999';
  tempContainer.style.pointerEvents = 'none';
  tempContainer.style.opacity = '1';
  tempContainer.style.background = '#ffffff';

  // Deep clone the target CV element
  const cloned = element.cloneNode(true) as HTMLElement;

  // Remove any preview-only badges / page-break indicators
  cloned.querySelectorAll('.no-print').forEach((el) => el.remove());

  // Reset scaling, positioning, margins, and transforms on clone so it renders at 1:1 true scale
  cloned.style.transform = 'none';
  cloned.style.transformOrigin = 'top left';
  cloned.style.boxShadow = 'none';
  cloned.style.margin = '0';
  cloned.style.width = '794px';
  cloned.style.minHeight = '1123px';
  cloned.style.height = 'auto';
  cloned.style.display = 'block';
  cloned.style.visibility = 'visible';
  cloned.style.position = 'relative';

  // Remove any nested responsive scale transforms on children
  const allCloned = cloned.querySelectorAll<HTMLElement>('*');
  allCloned.forEach((node) => {
    if (node.style.transform && node.style.transform.includes('scale')) {
      node.style.transform = 'none';
    }
  });

  tempContainer.appendChild(cloned);
  document.body.appendChild(tempContainer);

  try {
    // Wait for all images inside clone to be loaded
    const images = Array.from(cloned.querySelectorAll('img'));
    await Promise.all(
      images.map((img) => {
        if (img.complete) return Promise.resolve();
        return new Promise((resolve) => {
          img.onload = resolve;
          img.onerror = resolve;
        });
      })
    );

    // Apply smart page-break spacers in a single clean pass
    applySmartPageBreaks(cloned, 1123, 28, 28);

    // Render using html2canvas-pro with scale: 2.5 (~2000px width, ultra crisp 250+ DPI print resolution)
    const scale = 2.5;
    const canvas = await html2canvas(cloned, {
      scale: scale,
      useCORS: true,
      allowTaint: true,
      logging: false,
      backgroundColor: '#ffffff',
      width: 794,
      windowWidth: 794,
      imageTimeout: 15000
    });

    // Calculate real content height to avoid generating empty trailing pages
    const containerRect = cloned.getBoundingClientRect();
    let maxContentBottom = 0;

    const allContentNodes = Array.from(cloned.querySelectorAll<HTMLElement>('*'));
    allContentNodes.forEach((node) => {
      if (node.getAttribute('data-pdf-spacer') === 'true') return;
      if (node.offsetHeight > 0 && node.offsetWidth > 0) {
        const bottom = node.getBoundingClientRect().bottom - containerRect.top;
        if (bottom > maxContentBottom) {
          maxContentBottom = bottom;
        }
      }
    });

    const contentHeight = maxContentBottom > 0 ? maxContentBottom : cloned.scrollHeight;
    const pageHeightPx = 1123;
    const sliceHeightPx = Math.floor(pageHeightPx * scale);

    // Determine exact page count from content height
    const totalPages = Math.max(1, Math.ceil((contentHeight - 15) / pageHeightPx));

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true
    });

    for (let page = 0; page < totalPages; page++) {
      if (page > 0) {
        pdf.addPage('a4', 'portrait');
      }

      const pageCanvas = document.createElement('canvas');
      pageCanvas.width = canvas.width;
      pageCanvas.height = sliceHeightPx;

      const pCtx = pageCanvas.getContext('2d');
      if (pCtx) {
        pCtx.imageSmoothingEnabled = true;
        pCtx.imageSmoothingQuality = 'high';
        pCtx.fillStyle = '#ffffff';
        pCtx.fillRect(0, 0, pageCanvas.width, pageCanvas.height);

        const srcY = page * sliceHeightPx;
        const srcH = Math.min(sliceHeightPx, canvas.height - srcY);

        if (srcH > 0) {
          pCtx.drawImage(
            canvas,
            0,
            srcY,
            canvas.width,
            srcH,
            0,
            0,
            canvas.width,
            srcH
          );
        }
      }

      // High-quality JPEG compression provides vector-like sharpness at fraction of PNG file size
      const pageImgData = pageCanvas.toDataURL('image/jpeg', 0.96);

      pdf.addImage(
        pageImgData,
        'JPEG',
        0,
        0,
        210,
        297,
        undefined,
        'FAST'
      );
    }

    // Direct download with fallback
    try {
      pdf.save(filename);
    } catch {
      const blob = pdf.output('blob');
      const blobUrl = URL.createObjectURL(blob);
      const downloadAnchor = document.createElement('a');
      downloadAnchor.href = blobUrl;
      downloadAnchor.download = filename;
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      setTimeout(() => {
        if (downloadAnchor.parentNode) {
          downloadAnchor.parentNode.removeChild(downloadAnchor);
        }
        URL.revokeObjectURL(blobUrl);
      }, 1000);
    }
  } finally {
    // Completely remove the temporary sandbox container without leaving any trace
    if (tempContainer && tempContainer.parentNode) {
      tempContainer.parentNode.removeChild(tempContainer);
    }
  }
}

// Retain compatibility helpers
export function convertUnsupportedColors(cssText: string): string {
  return cssText;
}

export function convertOklchToRgb(cssText: string): string {
  return cssText;
}

export function sanitizeDocumentOklch(_doc: Document): () => void {
  return () => {};
}
