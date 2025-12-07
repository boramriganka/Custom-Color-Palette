import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import chroma from 'chroma-js';

const styles = {
  // Style 1: Grid Layout
  gridLayout: {
    backgroundColor: '#ffffff',
    padding: '3rem',
    fontFamily: 'Arial, sans-serif',
    minWidth: '800px',
    width: '100%',
    boxSizing: 'border-box',
    overflow: 'visible',
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
  },
  gridTitle: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '2rem',
    textAlign: 'center',
  },
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1.5rem',
    width: '100%',
    justifyContent: 'center',
  },
  gridItem: {
    textAlign: 'center',
    minWidth: '200px',
    maxWidth: '250px',
    padding: '0.5rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  gridSwatch: {
    width: '100%',
    height: '120px',
    borderRadius: '8px',
    marginBottom: '0.75rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  gridName: {
    fontSize: '0.9rem',
    fontWeight: '500',
    color: '#333',
    marginBottom: '0.25rem',
    wordBreak: 'break-word',
    overflowWrap: 'break-word',
    whiteSpace: 'normal',
  },
  gridCode: {
    fontSize: '1.1rem',
    color: '#222',
    fontFamily: '"Courier New", Courier, monospace, sans-serif',
    wordBreak: 'keep-all',
    overflowWrap: 'normal',
    whiteSpace: 'nowrap',
    letterSpacing: '1px',
    width: '100%',
    display: 'block',
    textAlign: 'center',
    lineHeight: '1.6',
    fontWeight: '700',
    textShadow: 'none',
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
  },
  
  // Style 2: Card Layout
  cardLayout: {
    backgroundColor: '#f5f5f5',
    padding: '3rem',
    fontFamily: "'Roboto', sans-serif",
    minWidth: '900px',
    boxSizing: 'border-box',
  },
  cardTitle: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#222',
    marginBottom: '1rem',
    textAlign: 'center',
  },
  cardSubtitle: {
    fontSize: '1rem',
    color: '#666',
    marginBottom: '2.5rem',
    textAlign: 'center',
  },
  cardContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '2rem',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '1.5rem',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  },
  cardSwatch: {
    width: '100%',
    height: '140px',
    borderRadius: '8px',
    marginBottom: '1rem',
  },
  cardName: {
    fontSize: '1.1rem',
    fontWeight: '600',
    color: '#222',
    marginBottom: '0.5rem',
  },
  cardCode: {
    fontSize: '0.95rem',
    color: '#666',
    fontFamily: 'monospace',
    backgroundColor: '#f5f5f5',
    padding: '0.5rem',
    borderRadius: '4px',
    wordBreak: 'break-all',
    overflowWrap: 'break-word',
    whiteSpace: 'normal',
  },
  
  // Style 3: Horizontal Strip
  stripLayout: {
    backgroundColor: '#ffffff',
    padding: '3rem',
    fontFamily: "'Roboto', sans-serif",
    minWidth: '1000px',
    boxSizing: 'border-box',
  },
  stripTitle: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '2rem',
    textAlign: 'center',
  },
  stripContainer: {
    display: 'flex',
    gap: '0',
    marginBottom: '2rem',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
  },
  stripSwatch: {
    flex: 1,
    height: '200px',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
    padding: '1rem',
  },
  stripLabel: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    padding: '0.5rem 1rem',
    borderRadius: '6px',
    textAlign: 'center',
  },
  stripName: {
    fontSize: '0.9rem',
    fontWeight: '600',
    marginBottom: '0.25rem',
  },
  stripCode: {
    fontSize: '0.8rem',
    fontFamily: 'monospace',
    wordBreak: 'break-all',
    overflowWrap: 'break-word',
    whiteSpace: 'normal',
  },
  
  // Style 4: Detailed List
  listLayout: {
    backgroundColor: '#ffffff',
    padding: '3rem',
    fontFamily: "'Roboto', sans-serif",
    minWidth: '800px',
    boxSizing: 'border-box',
  },
  listTitle: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#222',
    marginBottom: '0.5rem',
  },
  listSubtitle: {
    fontSize: '1rem',
    color: '#666',
    marginBottom: '2.5rem',
  },
  listItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '1.5rem',
    marginBottom: '1rem',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
  },
  listSwatch: {
    width: '80px',
    height: '80px',
    borderRadius: '8px',
    marginRight: '2rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  listInfo: {
    flex: 1,
  },
  listName: {
    fontSize: '1.3rem',
    fontWeight: '600',
    color: '#222',
    marginBottom: '0.5rem',
  },
  listDetails: {
    display: 'flex',
    gap: '2rem',
    fontSize: '0.9rem',
    color: '#666',
  },
  listDetail: {
    fontFamily: 'monospace',
  },
};

function ImageExportPreview({ classes, palette, style = 'grid', isExport = false }) {
  const colors = palette.colors || [];
  
  // Calculate scale factor based on number of colors for export
  // More colors = larger scale to maintain readability
  const colorCount = colors.length;
  const baseScale = isExport ? Math.max(1.5, Math.min(3, 1 + (colorCount / 10))) : 1;
  
  const getRGB = (hexColor) => {
    try {
      const rgb = chroma(hexColor).rgb();
      return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
    } catch {
      return hexColor;
    }
  };
  
  // Grid Layout
  if (style === 'grid') {
    // Calculate dimensions based on color count for export
    const cols = isExport ? Math.ceil(Math.sqrt(colorCount)) : undefined;
    const itemMinWidth = isExport ? 280 * baseScale : undefined;
    const swatchHeight = isExport ? 180 * baseScale : undefined;
    const titleSize = isExport ? `${3 * baseScale}rem` : undefined;
    const nameSize = isExport ? `${1.3 * baseScale}rem` : undefined;
    const codeSize = isExport ? `${1.6 * baseScale}rem` : undefined;
    const padding = isExport ? `${4 * baseScale}rem` : undefined;
    const gap = isExport ? `${2 * baseScale}rem` : undefined;
    
    return (
      <div 
        className={classes.gridLayout}
        style={isExport ? {
          padding: padding,
          minWidth: cols ? `${cols * itemMinWidth + (cols - 1) * (gap ? parseFloat(gap) * 16 : 0) + parseFloat(padding) * 32}px` : undefined,
        } : {}}
      >
        <div 
          className={classes.gridTitle}
          style={isExport ? { fontSize: titleSize, marginBottom: `${2.5 * baseScale}rem` } : {}}
        >
          {palette.paletteName}
        </div>
        <div 
          className={classes.gridContainer}
          style={isExport ? {
            gridTemplateColumns: cols ? `repeat(${cols}, minmax(${itemMinWidth}px, 1fr))` : undefined,
            gap: gap,
          } : {}}
        >
          {colors.map((color, index) => (
            <div 
              key={index} 
              className={classes.gridItem}
              style={isExport ? {
                minWidth: `${itemMinWidth}px`,
                maxWidth: `${itemMinWidth * 1.2}px`,
                padding: `${0.75 * baseScale}rem`,
              } : {}}
            >
              <div
                className={classes.gridSwatch}
                style={{ 
                  backgroundColor: color.color,
                  height: swatchHeight ? `${swatchHeight}px` : undefined,
                  marginBottom: isExport ? `${1 * baseScale}rem` : undefined,
                }}
              />
              <div 
                className={classes.gridName} 
                title={color.name}
                style={isExport ? { fontSize: nameSize, marginBottom: `${0.5 * baseScale}rem` } : {}}
              >
                {color.name}
              </div>
              <div 
                className={classes.gridCode} 
                title={color.color}
                style={{ 
                  display: 'block',
                  width: '100%',
                  maxWidth: '100%',
                  fontSize: codeSize,
                }}
              >
                {String(color.color || '').toUpperCase()}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  // Card Layout
  if (style === 'card') {
    const cols = isExport ? Math.ceil(Math.sqrt(colorCount)) : undefined;
    const itemMinWidth = isExport ? 300 * baseScale : undefined;
    const swatchHeight = isExport ? 200 * baseScale : undefined;
    const titleSize = isExport ? `${3.5 * baseScale}rem` : undefined;
    const subtitleSize = isExport ? `${1.3 * baseScale}rem` : undefined;
    const nameSize = isExport ? `${1.5 * baseScale}rem` : undefined;
    const codeSize = isExport ? `${1.2 * baseScale}rem` : undefined;
    const padding = isExport ? `${4 * baseScale}rem` : undefined;
    const gap = isExport ? `${2.5 * baseScale}rem` : undefined;
    const cardPadding = isExport ? `${2 * baseScale}rem` : undefined;
    
    return (
      <div 
        className={classes.cardLayout}
        style={isExport ? {
          padding: padding,
          minWidth: cols ? `${cols * itemMinWidth + (cols - 1) * (gap ? parseFloat(gap) * 16 : 0) + parseFloat(padding) * 32}px` : undefined,
        } : {}}
      >
        <div 
          className={classes.cardTitle}
          style={isExport ? { fontSize: titleSize, marginBottom: `${1.5 * baseScale}rem` } : {}}
        >
          {palette.paletteName}
        </div>
        <div 
          className={classes.cardSubtitle}
          style={isExport ? { fontSize: subtitleSize, marginBottom: `${3 * baseScale}rem` } : {}}
        >
          {colors.length} colors • {palette.emoji}
        </div>
        <div 
          className={classes.cardContainer}
          style={isExport ? {
            gridTemplateColumns: cols ? `repeat(${cols}, minmax(${itemMinWidth}px, 1fr))` : undefined,
            gap: gap,
          } : {}}
        >
          {colors.map((color, index) => (
            <div 
              key={index} 
              className={classes.card}
              style={isExport ? { padding: cardPadding } : {}}
            >
              <div
                className={classes.cardSwatch}
                style={{ 
                  backgroundColor: color.color,
                  height: swatchHeight ? `${swatchHeight}px` : undefined,
                  marginBottom: isExport ? `${1.5 * baseScale}rem` : undefined,
                }}
              />
              <div 
                className={classes.cardName}
                style={isExport ? { fontSize: nameSize, marginBottom: `${0.75 * baseScale}rem` } : {}}
              >
                {color.name}
              </div>
              <div 
                className={classes.cardCode}
                style={isExport ? { fontSize: codeSize, padding: `${0.75 * baseScale}rem` } : {}}
              >
                {String(color.color || '').toUpperCase()}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  // Horizontal Strip
  if (style === 'strip') {
    const stripHeight = isExport ? 300 * baseScale : undefined;
    const titleSize = isExport ? `${3 * baseScale}rem` : undefined;
    const nameSize = isExport ? `${1.2 * baseScale}rem` : undefined;
    const codeSize = isExport ? `${1.1 * baseScale}rem` : undefined;
    const padding = isExport ? `${4 * baseScale}rem` : undefined;
    const labelPadding = isExport ? `${0.75 * baseScale}rem ${1.5 * baseScale}rem` : undefined;
    const minWidth = isExport ? `${colorCount * 200 * baseScale}px` : undefined;
    
    return (
      <div 
        className={classes.stripLayout}
        style={isExport ? {
          padding: padding,
          minWidth: minWidth,
        } : {}}
      >
        <div 
          className={classes.stripTitle}
          style={isExport ? { fontSize: titleSize, marginBottom: `${2.5 * baseScale}rem` } : {}}
        >
          {palette.paletteName} {palette.emoji}
        </div>
        <div className={classes.stripContainer}>
          {colors.map((color, index) => (
            <div
              key={index}
              className={classes.stripSwatch}
              style={{ 
                backgroundColor: color.color,
                height: stripHeight ? `${stripHeight}px` : undefined,
                padding: isExport ? `${1.5 * baseScale}rem` : undefined,
              }}
            >
              <div 
                className={classes.stripLabel}
                style={isExport ? { padding: labelPadding } : {}}
              >
                <div
                  className={classes.stripName}
                  style={{ 
                    color: '#333',
                    fontSize: nameSize,
                    marginBottom: isExport ? `${0.5 * baseScale}rem` : undefined,
                  }}
                >
                  {color.name}
                </div>
                <div
                  className={classes.stripCode}
                  style={{ 
                    color: '#666',
                    fontSize: codeSize,
                  }}
                >
                  {String(color.color || '').toUpperCase()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  // Detailed List
  if (style === 'list') {
    const swatchSize = isExport ? 120 * baseScale : undefined;
    const titleSize = isExport ? `${3.5 * baseScale}rem` : undefined;
    const subtitleSize = isExport ? `${1.3 * baseScale}rem` : undefined;
    const nameSize = isExport ? `${1.8 * baseScale}rem` : undefined;
    const detailSize = isExport ? `${1.2 * baseScale}rem` : undefined;
    const padding = isExport ? `${4 * baseScale}rem` : undefined;
    const itemPadding = isExport ? `${2 * baseScale}rem` : undefined;
    const itemMargin = isExport ? `${1.5 * baseScale}rem` : undefined;
    const swatchMargin = isExport ? `${2.5 * baseScale}rem` : undefined;
    
    return (
      <div 
        className={classes.listLayout}
        style={isExport ? { padding: padding } : {}}
      >
        <div 
          className={classes.listTitle}
          style={isExport ? { fontSize: titleSize, marginBottom: `${0.75 * baseScale}rem` } : {}}
        >
          {palette.paletteName} {palette.emoji}
        </div>
        <div 
          className={classes.listSubtitle}
          style={isExport ? { fontSize: subtitleSize, marginBottom: `${3 * baseScale}rem` } : {}}
        >
          Color Palette • {colors.length} colors
        </div>
        {colors.map((color, index) => (
          <div 
            key={index} 
            className={classes.listItem}
            style={isExport ? {
              padding: itemPadding,
              marginBottom: itemMargin,
            } : {}}
          >
            <div
              className={classes.listSwatch}
              style={{ 
                backgroundColor: color.color,
                width: swatchSize ? `${swatchSize}px` : undefined,
                height: swatchSize ? `${swatchSize}px` : undefined,
                marginRight: swatchMargin,
              }}
            />
            <div className={classes.listInfo}>
              <div 
                className={classes.listName}
                style={isExport ? { fontSize: nameSize, marginBottom: `${0.75 * baseScale}rem` } : {}}
              >
                {color.name}
              </div>
              <div 
                className={classes.listDetails}
                style={isExport ? {
                  gap: `${2.5 * baseScale}rem`,
                  fontSize: detailSize,
                } : {}}
              >
                <div className={classes.listDetail}>HEX: {String(color.color || '').toUpperCase()}</div>
                <div className={classes.listDetail}>RGB: {getRGB(color.color)}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
  
  return null;
}

export default withStyles(styles)(ImageExportPreview);

