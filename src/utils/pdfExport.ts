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

export async function generatePDFFromElement(element: HTMLElement, fullName: string = 'My'): Promise<void> {
  if (!element) {
    throw new Error('Element for PDF generation not found');
  }

  // Sanitize filename
  const cleanName = fullName.trim().replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '_');
  const filename = `${cleanName || 'CV'}_CV.pdf`;

  // 1. Sanitize the main document before html2canvas inspects document.styleSheets or DOM
  const restoreMainDoc = sanitizeDocumentOklch(document);

  // 2. Prepare target element (if hidden on mobile, create temporary offscreen visible clone)
  let targetToRender = element;
  let tempOffscreenContainer: HTMLElement | null = null;

  const isHidden =
    element.offsetWidth === 0 ||
    element.offsetHeight === 0 ||
    window.getComputedStyle(element).display === 'none';

  if (isHidden) {
    tempOffscreenContainer = document.createElement('div');
    tempOffscreenContainer.style.position = 'fixed';
    tempOffscreenContainer.style.left = '-9999px';
    tempOffscreenContainer.style.top = '-9999px';
    tempOffscreenContainer.style.width = '794px';
    tempOffscreenContainer.style.zIndex = '-9999';
    tempOffscreenContainer.style.opacity = '0';
    tempOffscreenContainer.style.pointerEvents = 'none';

    const clonedForRender = element.cloneNode(true) as HTMLElement;
    clonedForRender.style.transform = 'none';
    clonedForRender.style.boxShadow = 'none';
    clonedForRender.style.margin = '0';
    clonedForRender.style.width = '794px';
    clonedForRender.style.minHeight = '1123px';
    clonedForRender.style.height = 'auto';
    clonedForRender.style.display = 'block';
    clonedForRender.style.visibility = 'visible';

    tempOffscreenContainer.appendChild(clonedForRender);
    document.body.appendChild(tempOffscreenContainer);
    targetToRender = clonedForRender;
  }

  try {
    const canvas = await html2canvas(targetToRender, {
      scale: 2, // High resolution rendering
      useCORS: true, // Allow cross-origin images like user photo
      logging: false,
      backgroundColor: '#ffffff',
      windowWidth: 794,
      onclone: (clonedDoc) => {
        // Sanitize the cloned document inside html2canvas
        sanitizeDocumentOklch(clonedDoc);

        // Ensure proper target element sizing in clone
        const clonedElement = clonedDoc.querySelector('[data-pdf-content="true"]') as HTMLElement;
        if (clonedElement) {
          clonedElement.style.transform = 'none';
          clonedElement.style.boxShadow = 'none';
          clonedElement.style.margin = '0';
          clonedElement.style.width = '794px';
          clonedElement.style.minHeight = '1123px';
          clonedElement.style.height = 'auto';
        }
      }
    });

    // Multi-page slicing calculation
    // Standard A4 aspect ratio height / width = 297 / 210 = 1.4142857...
    const a4Ratio = 297 / 210;
    const pageCanvasHeight = Math.floor(canvas.width * a4Ratio);
    const totalPages = Math.max(1, Math.ceil(canvas.height / pageCanvasHeight));

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
      pageCanvas.height = pageCanvasHeight;

      const pCtx = pageCanvas.getContext('2d');
      if (pCtx) {
        pCtx.fillStyle = '#ffffff';
        pCtx.fillRect(0, 0, pageCanvas.width, pageCanvas.height);

        const srcY = page * pageCanvasHeight;
        const srcH = Math.min(pageCanvasHeight, canvas.height - srcY);

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

      const pageImgData = pageCanvas.toDataURL('image/jpeg', 0.98);
      pdf.addImage(pageImgData, 'JPEG', 0, 0, 210, 297, undefined, 'FAST');
    }

    pdf.save(filename);
  } finally {
    if (tempOffscreenContainer && tempOffscreenContainer.parentNode) {
      tempOffscreenContainer.parentNode.removeChild(tempOffscreenContainer);
    }
    restoreMainDoc();
  }
}


