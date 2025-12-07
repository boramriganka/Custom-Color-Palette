import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import GetAppIcon from '@material-ui/icons/GetApp';
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PaletteIcon from '@material-ui/icons/Palette';
import ExportDialog from './ExportDialog';

const styles = {
  // Expanded panel styles
  root: {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    width: '350px',
    maxHeight: '500px',
    backgroundColor: '#1a1a1a',
    border: '2px solid #64B5F6',
    borderRadius: '12px',
    boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
    zIndex: 1000,
    display: 'flex',
    flexDirection: 'column',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    '@media (max-width: 768px)': {
      width: 'calc(100% - 40px)',
      left: '20px',
      right: '20px',
      maxHeight: '50vh',
    },
    '@media (max-width: 576px)': {
      width: 'calc(100% - 20px)',
      left: '10px',
      right: '10px',
      bottom: '10px',
    },
  },
  // Minimized floating button styles
  minimizedRoot: {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    zIndex: 1000,
    '@media (max-width: 576px)': {
      bottom: '10px',
      right: '10px',
    },
  },
  minimizedButton: {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    backgroundColor: '#64B5F6',
    color: 'white',
    boxShadow: '0 4px 20px rgba(100, 181, 246, 0.4)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': {
      backgroundColor: '#42A5F5',
      transform: 'scale(1.1)',
      boxShadow: '0 6px 30px rgba(100, 181, 246, 0.6)',
    },
    '@media (max-width: 576px)': {
      width: '50px',
      height: '50px',
    },
  },
  minimizedBadge: {
    '& .MuiBadge-badge': {
      backgroundColor: '#f44336',
      color: 'white',
      fontWeight: 'bold',
      fontSize: '0.75rem',
      minWidth: '22px',
      height: '22px',
      borderRadius: '11px',
      border: '2px solid #1a1a1a',
    },
  },
  header: {
    padding: '0.75rem 1rem',
    backgroundColor: '#2a2a2a',
    borderBottom: '1px solid #444',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: '10px 10px 0 0',
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
  },
  headerActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
  title: {
    color: '#64B5F6',
    fontWeight: '600',
    fontSize: '1rem',
  },
  count: {
    color: '#aaa',
    fontSize: '0.85rem',
    marginLeft: '0.5rem',
  },
  minimizeButton: {
    color: '#64B5F6',
    padding: '6px',
    transition: 'all 0.2s ease',
    '&:hover': {
      backgroundColor: 'rgba(100, 181, 246, 0.1)',
      transform: 'scale(1.1)',
    },
  },
  content: {
    padding: '0.75rem',
    overflowY: 'auto',
    flexGrow: 1,
    maxHeight: '300px',
  },
  colorItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '0.5rem 0.75rem',
    marginBottom: '0.5rem',
    backgroundColor: '#2a2a2a',
    borderRadius: '8px',
    transition: 'all 0.2s ease',
    '&:hover': {
      backgroundColor: '#333',
      transform: 'translateX(4px)',
    },
    '&:last-child': {
      marginBottom: 0,
    },
  },
  colorSwatch: {
    width: '36px',
    height: '36px',
    borderRadius: '8px',
    marginRight: '0.75rem',
    border: '2px solid #444',
    flexShrink: 0,
    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2)',
  },
  colorInfo: {
    flexGrow: 1,
    minWidth: 0,
  },
  colorName: {
    color: '#e0e0e0',
    fontSize: '0.85rem',
    fontWeight: '500',
    marginBottom: '0.15rem',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  colorCode: {
    color: '#888',
    fontSize: '0.75rem',
    fontFamily: "'Roboto Mono', monospace",
  },
  removeButton: {
    color: '#888',
    padding: '4px',
    transition: 'all 0.2s ease',
    '&:hover': {
      color: '#f44336',
      backgroundColor: 'rgba(244, 67, 54, 0.1)',
    },
  },
  actions: {
    padding: '0.75rem 1rem',
    borderTop: '1px solid #444',
    display: 'flex',
    gap: '0.5rem',
    backgroundColor: '#252525',
    borderRadius: '0 0 10px 10px',
  },
  actionButton: {
    flex: 1,
    fontSize: '0.8rem',
    padding: '0.5rem',
  },
  exportButton: {
    backgroundColor: '#64B5F6',
    color: 'white',
    fontWeight: '600',
    '&:hover': {
      backgroundColor: '#42A5F5',
    },
  },
  clearButton: {
    color: '#f44336',
    borderColor: 'rgba(244, 67, 54, 0.5)',
    '&:hover': {
      backgroundColor: 'rgba(244, 67, 54, 0.1)',
      borderColor: '#f44336',
    },
  },
  // Color preview strip for minimized state tooltip
  colorPreviewStrip: {
    display: 'flex',
    gap: '4px',
    marginTop: '4px',
  },
  colorPreviewDot: {
    width: '16px',
    height: '16px',
    borderRadius: '4px',
    border: '1px solid rgba(255,255,255,0.3)',
  },
};

class ColorSelectionManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exportDialogOpen: false,
      isMinimized: false,
    };
    this.openExportDialog = this.openExportDialog.bind(this);
    this.closeExportDialog = this.closeExportDialog.bind(this);
    this.toggleMinimize = this.toggleMinimize.bind(this);
    this.exportPreviewRef = React.createRef();
  }

  openExportDialog() {
    this.setState({ exportDialogOpen: true });
  }

  closeExportDialog() {
    this.setState({ exportDialogOpen: false });
  }

  toggleMinimize() {
    this.setState(st => ({ isMinimized: !st.isMinimized }));
  }

  renderMinimized() {
    const { classes, selectedColors } = this.props;
    
    // Create tooltip content showing color previews
    const tooltipContent = (
      <div style={{ padding: '4px' }}>
        <div style={{ fontWeight: 600, marginBottom: '8px' }}>
          {selectedColors.length} color{selectedColors.length > 1 ? 's' : ''} selected
        </div>
        <div className={classes.colorPreviewStrip}>
          {selectedColors.slice(0, 6).map((color, idx) => (
            <div
              key={idx}
              className={classes.colorPreviewDot}
              style={{ backgroundColor: color.color }}
            />
          ))}
          {selectedColors.length > 6 && (
            <div style={{ color: '#aaa', fontSize: '12px', marginLeft: '4px' }}>
              +{selectedColors.length - 6}
            </div>
          )}
        </div>
        <div style={{ fontSize: '11px', color: '#aaa', marginTop: '8px' }}>
          Click to expand
        </div>
      </div>
    );

    return (
      <div className={classes.minimizedRoot}>
        <Tooltip 
          title={tooltipContent} 
          placement="left" 
          arrow
          enterDelay={200}
        >
          <Badge 
            badgeContent={selectedColors.length} 
            className={classes.minimizedBadge}
            max={99}
          >
            <IconButton
              className={classes.minimizedButton}
              onClick={this.toggleMinimize}
            >
              <PaletteIcon style={{ fontSize: '1.75rem' }} />
            </IconButton>
          </Badge>
        </Tooltip>
      </div>
    );
  }

  renderExpanded() {
    const { classes, selectedColors, onRemoveColor, onClearAll, paletteName } = this.props;
    const { exportDialogOpen } = this.state;

    // Create a palette object for export
    const exportPalette = {
      paletteName: paletteName || 'Selected Colors',
      emoji: '🎨',
      colors: selectedColors,
    };

    return (
      <>
        <Paper className={classes.root} elevation={8}>
          <div className={classes.header}>
            <div className={classes.headerLeft}>
              <Typography className={classes.title} component="span">
                Selected Colors
              </Typography>
              <Typography className={classes.count} component="span">
                ({selectedColors.length})
              </Typography>
            </div>
            <div className={classes.headerActions}>
              <Tooltip title="Minimize panel" placement="top" arrow>
                <IconButton 
                  size="small" 
                  onClick={this.toggleMinimize} 
                  className={classes.minimizeButton}
                >
                  <ExpandMoreIcon />
                </IconButton>
              </Tooltip>
            </div>
          </div>

          <div className={classes.content} ref={this.exportPreviewRef}>
            {selectedColors.map((color, index) => (
              <div key={`${color.color}-${index}`} className={classes.colorItem}>
                <div
                  className={classes.colorSwatch}
                  style={{ backgroundColor: color.color }}
                />
                <div className={classes.colorInfo}>
                  <div className={classes.colorName}>{color.name}</div>
                  <div className={classes.colorCode}>{color.color}</div>
                </div>
                <Tooltip title="Remove color" placement="left" arrow>
                  <IconButton
                    size="small"
                    className={classes.removeButton}
                    onClick={() => onRemoveColor(index)}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </div>
            ))}
          </div>

          <div className={classes.actions}>
            <Tooltip title="Remove all selected colors" placement="top" arrow>
              <Button
                variant="outlined"
                size="small"
                className={`${classes.actionButton} ${classes.clearButton}`}
                startIcon={<DeleteSweepIcon />}
                onClick={onClearAll}
              >
                Clear All
              </Button>
            </Tooltip>
            <Tooltip title="Export selected colors in various formats" placement="top" arrow>
              <Button
                variant="contained"
                size="small"
                className={`${classes.actionButton} ${classes.exportButton}`}
                startIcon={<GetAppIcon />}
                onClick={this.openExportDialog}
              >
                Export
              </Button>
            </Tooltip>
          </div>
        </Paper>

        <ExportDialog
          open={exportDialogOpen}
          onClose={this.closeExportDialog}
          palette={exportPalette}
          paletteElement={this.exportPreviewRef.current}
        />
      </>
    );
  }

  render() {
    const { selectedColors } = this.props;
    const { isMinimized } = this.state;

    if (!selectedColors || selectedColors.length === 0) {
      return null;
    }

    return isMinimized ? this.renderMinimized() : this.renderExpanded();
  }
}

export default withStyles(styles)(ColorSelectionManager);
