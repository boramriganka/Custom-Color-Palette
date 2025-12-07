import { saveAs } from 'file-saver';
import html2canvas from 'html2canvas';

/**
 * Get flat array of colors from palette
 * @param {object} palette - Palette object
 * @returns {array} Flat array of colors
 */
function getFlatColors(palette) {
  if (!palette || !palette.colors) return [];
  
  // If colors is already an array (seed palette)
  if (Array.isArray(palette.colors)) {
    return palette.colors;
  }
  
  // If colors is an object with levels (generated palette)
  const flatColors = [];
  const levels = Object.keys(palette.colors).sort((a, b) => Number(a) - Number(b));
  
  levels.forEach(level => {
    if (Array.isArray(palette.colors[level])) {
      palette.colors[level].forEach(color => {
        flatColors.push({
          name: color.name,
          color: color.hex || color.color,
        });
      });
    }
  });
  
  return flatColors;
}

/**
 * Export palette as CSS custom properties
 * @param {object} palette - Palette object with colors array
 * @returns {string} CSS code
 */
export function exportAsCSS(palette) {
  const { paletteName } = palette;
  const colors = getFlatColors(palette);
  
  let css = `/* ${paletteName} Color Palette */\n:root {\n`;
  
  colors.forEach(color => {
    const safeName = color.name.toLowerCase().replace(/\s+/g, '-');
    css += `  --${safeName}: ${color.color};\n`;
  });
  
  css += `}\n`;
  return css;
}

/**
 * Export palette as SCSS variables
 * @param {object} palette - Palette object
 * @returns {string} SCSS code
 */
export function exportAsSCSS(palette) {
  const { paletteName } = palette;
  const colors = getFlatColors(palette);
  
  let scss = `// ${paletteName} Color Palette\n\n`;
  
  // Individual variables
  colors.forEach(color => {
    const safeName = color.name.toLowerCase().replace(/\s+/g, '-');
    scss += `$${safeName}: ${color.color};\n`;
  });
  
  scss += `\n// Color map\n`;
  scss += `$palette-colors: (\n`;
  colors.forEach((color, index) => {
    const safeName = color.name.toLowerCase().replace(/\s+/g, '-');
    scss += `  '${safeName}': ${color.color}`;
    if (index < colors.length - 1) scss += ',';
    scss += '\n';
  });
  scss += `);\n`;
  
  return scss;
}

/**
 * Export palette as JSON
 * @param {object} palette - Palette object
 * @returns {string} JSON string
 */
export function exportAsJSON(palette) {
  const colors = getFlatColors(palette);
  const exportData = {
    name: palette.paletteName,
    emoji: palette.emoji,
    colors: colors.map(c => ({
      name: c.name,
      hex: c.color,
    })),
  };
  return JSON.stringify(exportData, null, 2);
}

/**
 * Export palette as Tailwind config
 * @param {object} palette - Palette object
 * @returns {string} Tailwind config code
 */
export function exportAsTailwind(palette) {
  const { paletteName } = palette;
  const colors = getFlatColors(palette);
  const safeName = paletteName.toLowerCase().replace(/\s+/g, '-');
  
  let config = `// ${paletteName} - Tailwind CSS Configuration\n\n`;
  config += `module.exports = {\n`;
  config += `  theme: {\n`;
  config += `    extend: {\n`;
  config += `      colors: {\n`;
  config += `        '${safeName}': {\n`;
  
  colors.forEach((color, index) => {
    const colorName = color.name.toLowerCase().replace(/\s+/g, '-');
    config += `          '${colorName}': '${color.color}'`;
    if (index < colors.length - 1) config += ',';
    config += '\n';
  });
  
  config += `        },\n`;
  config += `      },\n`;
  config += `    },\n`;
  config += `  },\n`;
  config += `}\n`;
  
  return config;
}

/**
 * Export palette as JavaScript object
 * @param {object} palette - Palette object
 * @returns {string} JavaScript code
 */
export function exportAsJavaScript(palette) {
  const { paletteName } = palette;
  const colors = getFlatColors(palette);
  const safeName = paletteName.replace(/\s+/g, '');
  
  let js = `// ${paletteName} Color Palette\n\n`;
  js += `export const ${safeName}Palette = {\n`;
  
  colors.forEach((color, index) => {
    const colorName = color.name.replace(/\s+/g, '');
    js += `  ${colorName}: '${color.color}'`;
    if (index < colors.length - 1) js += ',';
    js += '\n';
  });
  
  js += `};\n\n`;
  
  // Also export as array
  js += `export const ${safeName}Colors = [\n`;
  colors.forEach((color, index) => {
    js += `  { name: '${color.name}', value: '${color.color}' }`;
    if (index < colors.length - 1) js += ',';
    js += '\n';
  });
  js += `];\n`;
  
  return js;
}

/**
 * Export palette as SVG
 * @param {object} palette - Palette object
 * @returns {string} SVG code
 */
export function exportAsSVG(palette) {
  const { paletteName } = palette;
  const colors = getFlatColors(palette);
  const swatchWidth = 100;
  const swatchHeight = 100;
  const cols = Math.ceil(Math.sqrt(colors.length));
  const rows = Math.ceil(colors.length / cols);
  const width = cols * swatchWidth;
  const height = rows * swatchHeight + 40; // Extra space for title
  
  let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">\n`;
  svg += `  <rect width="${width}" height="${height}" fill="#ffffff"/>\n`;
  svg += `  <text x="${width / 2}" y="25" font-family="Arial, sans-serif" font-size="18" font-weight="bold" text-anchor="middle" fill="#333333">${paletteName}</text>\n`;
  
  colors.forEach((color, index) => {
    const col = index % cols;
    const row = Math.floor(index / cols);
    const x = col * swatchWidth;
    const y = row * swatchHeight + 40;
    
    svg += `  <rect x="${x}" y="${y}" width="${swatchWidth}" height="${swatchHeight}" fill="${color.color}"/>\n`;
    svg += `  <text x="${x + swatchWidth / 2}" y="${y + swatchHeight / 2}" font-family="Arial, sans-serif" font-size="10" text-anchor="middle" fill="${getContrastColor(color.color)}">${color.name}</text>\n`;
    svg += `  <text x="${x + swatchWidth / 2}" y="${y + swatchHeight / 2 + 15}" font-family="monospace" font-size="9" text-anchor="middle" fill="${getContrastColor(color.color)}">${color.color}</text>\n`;
  });
  
  svg += `</svg>`;
  return svg;
}

/**
 * Helper function to get contrasting text color
 */
function getContrastColor(hexColor) {
  const r = parseInt(hexColor.substr(1, 2), 16);
  const g = parseInt(hexColor.substr(3, 2), 16);
  const b = parseInt(hexColor.substr(5, 2), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? '#000000' : '#ffffff';
}

/**
 * Export palette as PNG/JPEG image
 * @param {HTMLElement} element - DOM element to capture
 * @param {string} filename - Output filename
 * @param {string} format - 'png' or 'jpeg'
 * @param {object} palette - Palette object for creating export version
 * @param {string} exportStyle - Style for export ('grid', 'card', 'strip', 'list')
 * @returns {Promise} Promise that resolves when export is complete
 */
export async function exportAsImage(elementOrRef, filename, format = 'png', captureColorsOnly = true, palette = null, exportStyle = 'grid') {
  try {
    // Handle React refs
    const domElement = elementOrRef && elementOrRef.current ? elementOrRef.current : elementOrRef;
    
    if (!domElement) {
      throw new Error('Invalid element for image export');
    }
    
    // For palette view, find just the colors container if requested
    let targetElement = domElement;
    if (captureColorsOnly && domElement.querySelector) {
      // Look for the colors div (contains all ColorBox components)
      const colorsDiv = domElement.querySelector('[class*="colors"]');
      if (colorsDiv) {
        targetElement = colorsDiv;
      }
    }
    
    // Find the actual content element with the export target marker
    let contentElement = targetElement;
    
    // Look for element marked for export
    if (targetElement.querySelector) {
      const exportTarget = targetElement.querySelector('[data-export-target="true"]');
      if (exportTarget) {
        contentElement = exportTarget;
      }
    }
    
    // If we have an export-only element (created in ExportDialog), use that directly
    if (contentElement && contentElement.getAttribute && contentElement.getAttribute('data-export-only') === 'true') {
      // This is the hidden export version, use it directly
      // No need to find children, it's already the full-size version
    } else {
      // If still not found, look for the first child with actual content
    if (contentElement === targetElement && targetElement.children && targetElement.children.length > 0) {
      // Find the element that contains the actual preview content
      for (let child of targetElement.children) {
        // Check if this child has the actual content (not just a wrapper)
        if (child.children && child.children.length > 0) {
          contentElement = child;
          break;
        }
      }
    }
    
    // Get the innermost content element (ImageExportPreview renders here)
    let innerContent = contentElement;
    while (innerContent.children && innerContent.children.length === 1) {
      const child = innerContent.children[0];
      // Stop if child has no meaningful content or is just a wrapper
      if (child.scrollWidth <= innerContent.scrollWidth && 
          child.scrollHeight <= innerContent.scrollHeight &&
          child.offsetWidth === innerContent.offsetWidth) {
        break;
      }
      innerContent = child;
    }
    
    // Use the innermost content for capture
    contentElement = innerContent;
    
    // Get actual dimensions - use the natural size, not the scaled/visible size
    let scrollWidth = contentElement.scrollWidth || contentElement.offsetWidth;
    let scrollHeight = contentElement.scrollHeight || contentElement.offsetHeight;
    
    // If dimensions seem too small, check parent
    if (scrollWidth < 100 || scrollHeight < 100) {
      const parent = contentElement.parentElement;
      if (parent) {
        const parentWidth = parent.scrollWidth || parent.offsetWidth;
        const parentHeight = parent.scrollHeight || parent.offsetHeight;
        if (parentWidth > scrollWidth) scrollWidth = parentWidth;
        if (parentHeight > scrollHeight) scrollHeight = parentHeight;
      }
    }
    
    // Store original styles for all relevant elements
    const elementsToRestore = [];
    const saveStyles = (el) => {
      elementsToRestore.push({
        element: el,
        styles: {
          transform: el.style.transform,
          overflow: el.style.overflow,
          position: el.style.position,
          width: el.style.width,
          height: el.style.height,
          maxWidth: el.style.maxWidth,
          maxHeight: el.style.maxHeight,
        }
      });
    };
    
    // Save styles for content element and parents
    saveStyles(contentElement);
    let parent = contentElement.parentElement;
    while (parent && parent !== document.body && elementsToRestore.length < 3) {
      saveStyles(parent);
      parent = parent.parentElement;
    }
    
    // Temporarily adjust styles for capture - remove transforms and ensure visibility
    contentElement.style.transform = 'none';
    contentElement.style.overflow = 'visible';
    contentElement.style.position = 'relative';
    contentElement.style.width = scrollWidth + 'px';
    contentElement.style.height = scrollHeight + 'px';
    contentElement.style.maxWidth = 'none';
    contentElement.style.maxHeight = 'none';
    
    // Ensure parent containers don't clip
    let currentParent = contentElement.parentElement;
    while (currentParent && currentParent !== document.body) {
      const parentStyle = window.getComputedStyle(currentParent);
      if (parentStyle.overflow === 'hidden' || parentStyle.overflow === 'auto') {
        currentParent.style.overflow = 'visible';
        saveStyles(currentParent);
      }
      currentParent = currentParent.parentElement;
    }
    
    // Scroll to beginning
    if (contentElement.scrollTop !== 0) contentElement.scrollTop = 0;
    if (contentElement.scrollLeft !== 0) contentElement.scrollLeft = 0;
    if (targetElement.scrollTop !== 0) targetElement.scrollTop = 0;
    if (targetElement.scrollLeft !== 0) targetElement.scrollLeft = 0;
    
    // Wait for layout to settle and fonts to load
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Ensure fonts are loaded
    if (document.fonts && document.fonts.ready) {
      await document.fonts.ready;
    }
    
    // Wait a bit more for rendering
    await new Promise(resolve => setTimeout(resolve, 200));
    
    // Recalculate dimensions after style changes
    const finalWidth = contentElement.scrollWidth || contentElement.offsetWidth || scrollWidth;
    const finalHeight = contentElement.scrollHeight || contentElement.offsetHeight || scrollHeight;
    
    // Capture with proper options
    const canvas = await html2canvas(contentElement, {
      backgroundColor: format === 'png' ? null : '#ffffff',
      scale: 2,
      logging: false,
      useCORS: true,
      allowTaint: true,
      width: finalWidth,
      height: finalHeight,
      windowWidth: finalWidth,
      windowHeight: finalHeight,
      scrollX: 0,
      scrollY: 0,
      x: 0,
      y: 0,
      removeContainer: false,
      imageTimeout: 20000,
      foreignObjectRendering: false, // Use native text rendering
      onclone: (clonedDoc, element) => {
        // In the cloned document, ensure transforms are removed and text is visible
        const clonedElement = element;
        if (clonedElement) {
          clonedElement.style.transform = 'none';
          clonedElement.style.overflow = 'visible';
          clonedElement.style.position = 'relative';
          clonedElement.style.width = finalWidth + 'px';
          clonedElement.style.height = finalHeight + 'px';
          
          // Fix all text elements to ensure proper rendering
          const textElements = clonedElement.querySelectorAll('*');
          textElements.forEach((el) => {
            // Ensure text is not clipped
            el.style.overflow = 'visible';
            el.style.textOverflow = 'clip';
            
            // Get computed styles to preserve font sizes from export version
            const computedStyle = window.getComputedStyle(el);
            const fontSize = computedStyle.fontSize;
            
            // For hex code elements, ensure they render correctly with clear, readable text
            if (el.textContent && (el.textContent.match(/^#[0-9A-Fa-f]{6}$/i) || el.classList.contains('gridCode') || el.classList.contains('cardCode') || el.classList.contains('stripCode') || el.classList.contains('listDetail'))) {
              el.style.whiteSpace = 'nowrap';
              el.style.wordBreak = 'normal';
              el.style.overflowWrap = 'normal';
              el.style.fontFamily = 'monospace, "Courier New", Courier, sans-serif';
              el.style.fontWeight = '700';
              // Preserve the export font size if it exists, otherwise use a minimum readable size
              if (fontSize && parseFloat(fontSize) > 0) {
                el.style.fontSize = fontSize;
              } else {
                el.style.fontSize = '1.6rem'; // Minimum readable size for export
              }
              el.style.color = '#222';
              el.style.textShadow = 'none';
              // Ensure text content is correct
              if (el.textContent.match(/^#[0-9A-Fa-f]{6}$/i)) {
                el.textContent = el.textContent.toUpperCase();
              }
            }
            
            // For color names, ensure they're readable
            if (el.classList.contains('gridName') || el.classList.contains('cardName') || el.classList.contains('stripName') || el.classList.contains('listName')) {
              el.style.wordBreak = 'break-word';
              el.style.overflowWrap = 'break-word';
              el.style.whiteSpace = 'normal';
              // Preserve export font size
              if (fontSize && parseFloat(fontSize) > 0) {
                el.style.fontSize = fontSize;
              }
            }
            
            // Ensure all text nodes are preserved
            if (el.childNodes) {
              el.childNodes.forEach((node) => {
                if (node.nodeType === Node.TEXT_NODE) {
                  // Preserve text content exactly
                  node.textContent = node.textContent;
                }
              });
            }
          });
        }
      },
    });
    
    // Restore all original styles
    elementsToRestore.forEach(({ element, styles }) => {
      element.style.transform = styles.transform;
      element.style.overflow = styles.overflow;
      element.style.position = styles.position;
      element.style.width = styles.width;
      element.style.height = styles.height;
      element.style.maxWidth = styles.maxWidth;
      element.style.maxHeight = styles.maxHeight;
    });
    
    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (blob) {
          saveAs(blob, `${filename}.${format}`);
          resolve();
        } else {
          reject(new Error('Failed to create image'));
        }
      }, `image/${format}`, format === 'jpeg' ? 0.95 : undefined);
    });
  } catch (error) {
    console.error('Error exporting image:', error);
    throw error;
  }
}

/**
 * Download file with given content
 * @param {string} content - File content
 * @param {string} filename - Filename with extension
 * @param {string} mimeType - MIME type
 */
export function downloadFile(content, filename, mimeType = 'text/plain') {
  const blob = new Blob([content], { type: mimeType });
  saveAs(blob, filename);
}

/**
 * Copy text to clipboard
 * @param {string} text - Text to copy
 * @returns {Promise<boolean>} Success status
 */
export async function copyToClipboard(text) {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      document.body.appendChild(textArea);
      textArea.select();
      const success = document.execCommand('copy');
      document.body.removeChild(textArea);
      return success;
    }
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    return false;
  }
}

/**
 * Get all export formats with metadata
 * @returns {array} Array of export format objects
 */
export function getExportFormats() {
  return [
    {
      id: 'css',
      name: 'CSS Variables',
      extension: 'css',
      mimeType: 'text/css',
      description: 'CSS custom properties for use in stylesheets',
      icon: 'code',
    },
    {
      id: 'scss',
      name: 'SCSS Variables',
      extension: 'scss',
      mimeType: 'text/plain',
      description: 'SCSS variables and color maps',
      icon: 'code',
    },
    {
      id: 'json',
      name: 'JSON',
      extension: 'json',
      mimeType: 'application/json',
      description: 'Structured JSON data',
      icon: 'data_object',
    },
    {
      id: 'tailwind',
      name: 'Tailwind Config',
      extension: 'js',
      mimeType: 'text/javascript',
      description: 'Tailwind CSS configuration',
      icon: 'code',
    },
    {
      id: 'javascript',
      name: 'JavaScript',
      extension: 'js',
      mimeType: 'text/javascript',
      description: 'ES6 module exports',
      icon: 'code',
    },
    {
      id: 'svg',
      name: 'SVG',
      extension: 'svg',
      mimeType: 'image/svg+xml',
      description: 'Scalable vector graphic',
      icon: 'image',
    },
    {
      id: 'png',
      name: 'PNG Image',
      extension: 'png',
      mimeType: 'image/png',
      description: 'High-quality raster image',
      icon: 'image',
    },
    {
      id: 'jpeg',
      name: 'JPEG Image',
      extension: 'jpeg',
      mimeType: 'image/jpeg',
      description: 'Compressed raster image',
      icon: 'image',
    },
  ];
}

/**
 * Export palette in specified format
 * @param {object} palette - Palette object
 * @param {string} format - Export format id
 * @param {HTMLElement} element - DOM element for image export
 * @returns {Promise<string>} Exported content or success message
 */
export async function exportPalette(palette, format, element = null) {
  const safeName = palette.paletteName.toLowerCase().replace(/\s+/g, '-');
  
  switch (format) {
    case 'css':
      const css = exportAsCSS(palette);
      downloadFile(css, `${safeName}.css`, 'text/css');
      return css;
      
    case 'scss':
      const scss = exportAsSCSS(palette);
      downloadFile(scss, `${safeName}.scss`, 'text/plain');
      return scss;
      
    case 'json':
      const json = exportAsJSON(palette);
      downloadFile(json, `${safeName}.json`, 'application/json');
      return json;
      
    case 'tailwind':
      const tailwind = exportAsTailwind(palette);
      downloadFile(tailwind, `${safeName}-tailwind.config.js`, 'text/javascript');
      return tailwind;
      
    case 'javascript':
      const js = exportAsJavaScript(palette);
      downloadFile(js, `${safeName}.js`, 'text/javascript');
      return js;
      
    case 'svg':
      const svg = exportAsSVG(palette);
      downloadFile(svg, `${safeName}.svg`, 'image/svg+xml');
      return svg;
      
    case 'png':
      if (!element) throw new Error('Element required for PNG export');
      await exportAsImage(element, safeName, 'png');
      return 'PNG exported successfully';
      
    case 'jpeg':
      if (!element) throw new Error('Element required for JPEG export');
      await exportAsImage(element, safeName, 'jpeg');
      return 'JPEG exported successfully';
      
    default:
      throw new Error(`Unknown export format: ${format}`);
  }
}


