import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

// Helper to mathematically convert OKLCH color strings to RGB/RGBA
function parseAndConvertOklch(oklchStr: string): string {
  try {
    const inner = oklchStr.replace(/^oklch\(\s*/i, '').replace(/\s*\)$/i, '').trim();
    if (!inner) return 'rgb(0, 0, 0)';

    const parts = inner.split('/');
    const colorPart = parts[0].trim();
    const alphaPart = parts[1] ? parts[1].trim() : null;

    const components = colorPart.split(/[\s,]+/).filter(Boolean);
    if (components.length < 3) return 'rgb(0, 0, 0)';

    let lStr = components[0];
    let l = parseFloat(lStr);
    if (lStr.endsWith('%')) l = l / 100;
    if (isNaN(l)) l = 0;
    l = Math.max(0, Math.min(1, l));

    let cStr = components[1];
    let c = parseFloat(cStr);
    if (cStr.endsWith('%')) c = (c / 100) * 0.4;
    if (isNaN(c)) c = 0;

    let hStr = components[2];
    let h = parseFloat(hStr);
    if (hStr.endsWith('rad')) h = h * (180 / Math.PI);
    else if (hStr.endsWith('turn')) h = h * 360;
    if (isNaN(h)) h = 0;

    let a = 1;
    if (alphaPart) {
      a = parseFloat(alphaPart);
      if (alphaPart.endsWith('%')) a = a / 100;
      if (isNaN(a)) a = 1;
      a = Math.max(0, Math.min(1, a));
    }

    // Convert OKLCH to OKLAB
    const hRad = (h * Math.PI) / 180;
    const aLab = c * Math.cos(hRad);
    const bLab = c * Math.sin(hRad);

    // Convert OKLAB to linear RGB
    const l_ = l + 0.3963377774 * aLab + 0.2158037573 * bLab;
    const m_ = l - 0.1055613458 * aLab - 0.0638541728 * bLab;
    const s_ = l - 0.0894841775 * aLab - 1.2914855480 * bLab;

    const l3 = l_ * l_ * l_;
    const m3 = m_ * m_ * m_;
    const s3 = s_ * s_ * s_;

    const rLin = +4.0767416621 * l3 - 3.3077115913 * m3 + 0.2309699292 * s3;
    const gLin = -1.2684380046 * l3 + 2.6097574011 * m3 - 0.3413193965 * s3;
    const bLin = -0.0041960863 * l3 - 0.7034186147 * m3 + 1.7076147010 * s3;

    // Linear RGB to sRGB gamma transfer
    const toSrgb = (x: number) => {
      const clamped = Math.max(0, Math.min(1, x));
      return clamped <= 0.0031308
        ? Math.round(clamped * 12.92 * 255)
        : Math.round((1.055 * Math.pow(clamped, 1 / 2.4) - 0.055) * 255);
    };

    const r = toSrgb(rLin);
    const g = toSrgb(gLin);
    const b = toSrgb(bLin);

    if (a < 1) {
      return `rgba(${r}, ${g}, ${b}, ${Number(a.toFixed(3))})`;
    }
    return `rgb(${r}, ${g}, ${b})`;
  } catch {
    return 'rgb(0, 0, 0)';
  }
}

export function convertOklchToRgb(cssText: string): string {
  if (!cssText || !cssText.includes('oklch')) return cssText;

  const oklchRegex = /oklch\((?:[^()]+|\([^()]*\))*\)/gi;

  return cssText.replace(oklchRegex, (match) => {
    return parseAndConvertOklch(match);
  });
}

export function sanitizeDocumentOklch(doc: Document): () => void {
  const restores: Array<() => void> = [];

  // 1. Sanitize all <style> elements
  const styleElements = Array.from(doc.querySelectorAll('style'));
  styleElements.forEach((styleEl) => {
    if (styleEl.textContent && styleEl.textContent.includes('oklch')) {
      const originalText = styleEl.textContent;
      styleEl.textContent = convertOklchToRgb(originalText);
      restores.push(() => {
        styleEl.textContent = originalText;
      });
    }
  });

  // 2. Sanitize <link rel="stylesheet"> elements
  const linkElements = Array.from(doc.querySelectorAll('link[rel="stylesheet"]'));
  linkElements.forEach((linkEl) => {
    try {
      const sheet = (linkEl as HTMLLinkElement).sheet;
      if (sheet && sheet.cssRules) {
        const cssText = Array.from(sheet.cssRules)
          .map((r) => r.cssText)
          .join('\n');
        if (cssText.includes('oklch')) {
          const parent = linkEl.parentNode;
          const newStyle = doc.createElement('style');
          newStyle.textContent = convertOklchToRgb(cssText);

          if (parent) {
            parent.insertBefore(newStyle, linkEl);
            parent.removeChild(linkEl);
            restores.push(() => {
              if (newStyle.parentNode) {
                newStyle.parentNode.insertBefore(linkEl, newStyle);
                newStyle.parentNode.removeChild(newStyle);
              }
            });
          }
        }
      }
    } catch {
      // Ignore cross-origin stylesheet errors
    }
  });

  // 3. Sanitize CSSStyleSheet rules in doc.styleSheets
  try {
    const sheets = Array.from(doc.styleSheets);
    sheets.forEach((sheet) => {
      try {
        const rules = Array.from(sheet.cssRules || []);
        rules.forEach((rule) => {
          if (rule.cssText && rule.cssText.includes('oklch')) {
            if ('style' in rule && (rule as CSSStyleRule).style) {
              const styleObj = (rule as CSSStyleRule).style;
              for (let i = 0; i < styleObj.length; i++) {
                const prop = styleObj[i];
                const val = styleObj.getPropertyValue(prop);
                if (val && val.includes('oklch')) {
                  const converted = convertOklchToRgb(val);
                  styleObj.setProperty(prop, converted);
                }
              }
            }
          }
        });
      } catch {
        // Ignore cross-origin stylesheet
      }
    });
  } catch {
    // Ignore
  }

  // 4. Sanitize inline styles & computed styles on elements
  const allNodes = Array.from(doc.querySelectorAll('*'));
  const colorProps = [
    'color',
    'background-color',
    'border-color',
    'border-top-color',
    'border-bottom-color',
    'border-left-color',
    'border-right-color',
    'outline-color',
    'fill',
    'stroke',
    'box-shadow',
    'text-decoration-color'
  ];

  const defaultView = doc.defaultView || window;

  allNodes.forEach((node) => {
    const el = node as HTMLElement;
    const origStyleAttr = el.getAttribute ? el.getAttribute('style') : null;
    let modified = false;

    if (origStyleAttr && origStyleAttr.includes('oklch')) {
      el.setAttribute('style', convertOklchToRgb(origStyleAttr));
      modified = true;
    }

    if (defaultView && el.nodeType === 1) {
      try {
        const computed = defaultView.getComputedStyle(el);
        for (const prop of colorProps) {
          const val = computed.getPropertyValue(prop);
          if (val && val.includes('oklch')) {
            const converted = convertOklchToRgb(val);
            el.style.setProperty(prop, converted, 'important');
            modified = true;
          }
        }
      } catch {
        // Ignore
      }
    }

    if (modified) {
      restores.push(() => {
        if (origStyleAttr !== null) {
          el.setAttribute('style', origStyleAttr);
        } else {
          el.removeAttribute('style');
        }
      });
    }
  });

  return () => {
    restores.reverse().forEach((restore) => {
      try {
        restore();
      } catch {
        // Ignore
      }
    });
  };
}

function applySmartPageBreaks(container: HTMLElement, pageHeightPx: number = 1123) {
  // Query structural blocks that shouldn't be split mid-way
  const selectors = [
    'section',
    'article',
    'header',
    'main > div',
    'aside > div',
    '.space-y-3.5 > div',
    '.space-y-3 > div',
    '.space-y-4 > div',
    '.space-y-2 > div',
    'h2',
    'h3',
    '.break-inside-avoid'
  ];

  const blocks = Array.from(container.querySelectorAll<HTMLElement>(selectors.join(', ')));

  // Filter out duplicate child blocks where a parent container (like <section>) is already in the list
  const filteredBlocks = blocks.filter((b, index) => {
    return !blocks.some((other, otherIdx) => otherIdx !== index && other.contains(b) && (other.tagName.toLowerCase() === 'section' || other.tagName.toLowerCase() === 'article'));
  });

  const containerRect = container.getBoundingClientRect();

  for (const block of filteredBlocks) {
    const blockRect = block.getBoundingClientRect();
    const relativeTop = blockRect.top - containerRect.top;
    const blockHeight = blockRect.height;

    // Skip blocks that are taller than 80% of a page
    if (blockHeight <= 0 || blockHeight > pageHeightPx * 0.8) {
      continue;
    }

    const startPage = Math.floor(relativeTop / pageHeightPx);
    const endPage = Math.floor((relativeTop + blockHeight - 1) / pageHeightPx);

    if (startPage !== endPage) {
      // The element crosses a page boundary! Insert a spacer div to push it to the next page
      const targetPageTop = (startPage + 1) * pageHeightPx;
      const neededSpacer = targetPageTop - relativeTop;

      if (neededSpacer > 0 && neededSpacer < pageHeightPx - 40) {
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

export async function generatePDFFromElement(element: HTMLElement, fullName: string = 'My'): Promise<void> {
  if (!element) {
    throw new Error('Element for PDF generation not found');
  }

  // 1. Wait for document fonts to be ready
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

  // 2. Sanitize OKLCH colors in document
  const restoreMainDoc = sanitizeDocumentOklch(document);

  // 3. Create an offscreen render container at EXACT 794px width unscaled (A4 1:1 ratio at 96DPI)
  const tempOffscreenContainer = document.createElement('div');
  tempOffscreenContainer.style.position = 'fixed';
  tempOffscreenContainer.style.left = '-9999px';
  tempOffscreenContainer.style.top = '0';
  tempOffscreenContainer.style.width = '794px';
  tempOffscreenContainer.style.zIndex = '-9999';
  tempOffscreenContainer.style.opacity = '0';
  tempOffscreenContainer.style.pointerEvents = 'none';

  // Deep clone the target element
  const clonedForRender = element.cloneNode(true) as HTMLElement;

  // Reset all scaling, positioning, margins, and transforms on clone
  clonedForRender.style.transform = 'none';
  clonedForRender.style.transformOrigin = 'top left';
  clonedForRender.style.boxShadow = 'none';
  clonedForRender.style.margin = '0';
  clonedForRender.style.padding = '0';
  clonedForRender.style.width = '794px';
  clonedForRender.style.minHeight = '1123px';
  clonedForRender.style.height = 'auto';
  clonedForRender.style.display = 'block';
  clonedForRender.style.visibility = 'visible';
  clonedForRender.style.position = 'relative';

  // Remove any inline scaling on cloned children
  const allCloned = clonedForRender.querySelectorAll<HTMLElement>('*');
  allCloned.forEach((node) => {
    if (node.style.transform && node.style.transform.includes('scale')) {
      node.style.transform = 'none';
    }
  });

  tempOffscreenContainer.appendChild(clonedForRender);
  document.body.appendChild(tempOffscreenContainer);

  try {
    // Wait for images inside clone to be loaded
    const images = Array.from(clonedForRender.querySelectorAll('img'));
    await Promise.all(
      images.map((img) => {
        if (img.complete) return Promise.resolve();
        return new Promise((resolve) => {
          img.onload = resolve;
          img.onerror = resolve;
        });
      })
    );

    // Apply smart page-break spacers to prevent chopping text/headings
    applySmartPageBreaks(clonedForRender, 1123);

    // Sanitize colors inside the cloned offscreen tree
    sanitizeDocumentOklch(document);

    // 4. Render html2canvas on the unscaled offscreen clone
    // scale: 3 gives ~2382px width for 4K ultra crisp vector text & images
    const canvas = await html2canvas(clonedForRender, {
      scale: 3,
      useCORS: true,
      allowTaint: true,
      logging: false,
      backgroundColor: '#ffffff',
      width: 794,
      windowWidth: 794,
      imageTimeout: 0,
      onclone: (clonedDoc) => {
        sanitizeDocumentOklch(clonedDoc);
      }
    });

    // 5. Slice canvas into exact A4 pages (1123px height per page at 1:1 => 3369px per page at 3x)
    const pageHeightPx = 1123;
    const sliceHeightPx = Math.floor(pageHeightPx * 3);
    const totalPages = Math.max(1, Math.ceil(canvas.height / sliceHeightPx));

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

      // Draw background
      pdf.setFillColor(255, 255, 255);
      pdf.rect(0, 0, 210, 297, 'F');

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

      // Export 4K PNG
      const pageImgData = pageCanvas.toDataURL('image/png', 1.0);

      pdf.addImage(
        pageImgData,
        'PNG',
        0,
        0,
        210,
        297,
        undefined,
        'FAST'
      );
    }

    pdf.save(filename);
  } finally {
    if (tempOffscreenContainer && tempOffscreenContainer.parentNode) {
      tempOffscreenContainer.parentNode.removeChild(tempOffscreenContainer);
    }
    restoreMainDoc();
  }
}


