import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import Tooltip from '@material-ui/core/Tooltip';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import CloseIcon from '@material-ui/icons/Close';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import GetAppIcon from '@material-ui/icons/GetApp';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import ZoomOutIcon from '@material-ui/icons/ZoomOut';
import AspectRatioIcon from '@material-ui/icons/AspectRatio';
import RefreshIcon from '@material-ui/icons/Refresh';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import SettingsIcon from '@material-ui/icons/Settings';
import ImageExportPreview from './ImageExportPreview';
import {
  exportAsCSS,
  exportAsSCSS,
  exportAsJSON,
  exportAsTailwind,
  exportAsJavaScript,
  exportAsSVG,
  exportAsImage,
  copyToClipboard,
  downloadFile,
  getExportFormats,
} from './helpers/exportHelpers';

const styles = {
  dialog: {
    '& .MuiDialog-paper': {
      backgroundColor: '#1a1a1a',
      color: '#e0e0e0',
      minWidth: '600px',
      maxWidth: '800px',
      '@media (max-width: 768px)': {
        minWidth: '100%',
        maxWidth: '100%',
        margin: '0',
        maxHeight: '100vh',
        height: '100vh',
      },
      '@media (max-width: 480px)': {
        minWidth: '100%',
        maxWidth: '100%',
        margin: '0',
        maxHeight: '100vh',
        height: '100vh',
      },
    },
  },
  dialogTitle: {
    backgroundColor: '#2a2a2a',
    borderBottom: '1px solid #444',
    '@media (max-width: 768px)': {
      padding: '0.75rem 1rem',
      '& h6': {
        fontSize: '1rem',
      },
    },
    '@media (max-width: 480px)': {
      padding: '0.5rem 0.75rem',
      '& h6': {
        fontSize: '0.9rem',
      },
    },
  },
  tabs: {
    borderBottom: '1px solid #444',
    overflowX: 'auto',
    '& .MuiTabs-scroller': {
      overflowX: 'auto !important',
    },
    '& .MuiTabs-flexContainer': {
      minWidth: 'max-content',
    },
    '& .MuiTab-root': {
      color: '#aaa',
      minWidth: '100px',
      '@media (max-width: 768px)': {
        minWidth: 'auto',
        fontSize: '0.7rem',
        padding: '0.5rem 0.5rem',
        textTransform: 'uppercase',
      },
      '@media (max-width: 480px)': {
        minWidth: 'auto',
        fontSize: '0.65rem',
        padding: '0.4rem 0.4rem',
        textTransform: 'uppercase',
      },
    },
    '& .Mui-selected': {
      color: '#64B5F6',
    },
    '& .MuiTabs-indicator': {
      backgroundColor: '#64B5F6',
    },
    '@media (max-width: 768px)': {
      '& .MuiTabs-scrollButtons': {
        display: 'flex',
      },
    },
  },
  codeBlock: {
    backgroundColor: '#0d1117',
    color: '#c9d1d9',
    padding: '1rem',
    borderRadius: '8px',
    fontFamily: 'monospace',
    fontSize: '0.9rem',
    overflowX: 'auto',
    overflowY: 'auto',
    maxHeight: '400px',
    marginTop: '1rem',
    border: '1px solid #30363d',
    wordBreak: 'break-word',
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word',
    '@media (max-width: 768px)': {
      padding: '0.75rem',
      fontSize: '0.8rem',
      maxHeight: '50vh',
      overflowX: 'auto',
      overflowY: 'auto',
      whiteSpace: 'pre-wrap',
      wordBreak: 'break-word',
      wordWrap: 'break-word',
    },
    '@media (max-width: 480px)': {
      padding: '0.5rem',
      fontSize: '0.75rem',
      maxHeight: '45vh',
      lineHeight: '1.4',
      overflowX: 'auto',
      overflowY: 'auto',
      whiteSpace: 'pre-wrap',
      wordBreak: 'break-word',
      wordWrap: 'break-word',
    },
  },
  actions: {
    padding: '1rem',
    backgroundColor: '#2a2a2a',
    borderTop: '1px solid #444',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    '@media (max-width: 768px)': {
      padding: '0.75rem',
      flexDirection: 'column',
      gap: '0.5rem',
      '& > div': {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        gap: '0.5rem',
      },
      '& button': {
        flex: 1,
        fontSize: '0.875rem',
        padding: '0.5rem 0.75rem',
      },
    },
    '@media (max-width: 480px)': {
      padding: '0.5rem',
      '& button': {
        fontSize: '0.8rem',
        padding: '0.4rem 0.6rem',
      },
    },
  },
  formatInfo: {
    marginTop: '1rem',
    padding: '1rem',
    backgroundColor: '#2a2a2a',
    borderRadius: '8px',
    color: '#aaa',
    '@media (max-width: 768px)': {
      padding: '0.75rem',
      fontSize: '0.875rem',
      marginTop: '0.75rem',
    },
    '@media (max-width: 480px)': {
      padding: '0.5rem',
      fontSize: '0.8rem',
      marginTop: '0.5rem',
    },
  },
  imageNote: {
    marginTop: '0.5rem',
    padding: '0.75rem',
    backgroundColor: '#2a2a2a',
    borderRadius: '8px',
    color: '#aaa',
    fontSize: '0.875rem',
    '@media (max-width: 768px)': {
      padding: '0.5rem',
      fontSize: '0.8rem',
      marginTop: '0.5rem',
    },
    '@media (max-width: 480px)': {
      padding: '0.4rem',
      fontSize: '0.75rem',
      marginTop: '0.4rem',
    },
  },
  imageStyleSelector: {
    marginTop: '1.5rem',
    padding: '1rem',
    backgroundColor: '#2a2a2a',
    borderRadius: '8px',
    '& .MuiFormLabel-root': {
      color: '#e0e0e0',
      marginBottom: '0.5rem',
      '@media (max-width: 768px)': {
        fontSize: '0.875rem',
      },
      '@media (max-width: 480px)': {
        fontSize: '0.8rem',
      },
    },
    '& .MuiFormControlLabel-label': {
      color: '#aaa',
      '@media (max-width: 768px)': {
        fontSize: '0.875rem',
      },
      '@media (max-width: 480px)': {
        fontSize: '0.75rem',
      },
    },
    '& .MuiRadio-root': {
      color: '#64B5F6',
    },
    '@media (max-width: 768px)': {
      padding: '0.75rem',
      marginTop: '1rem',
    },
    '@media (max-width: 480px)': {
      padding: '0.5rem',
      marginTop: '0.75rem',
    },
  },
  imagePreviewContainer: {
    marginTop: '0.5rem',
    height: 'calc(100vh - 280px)',
    minHeight: '400px',
    maxHeight: '600px',
    overflowY: 'auto',
    overflowX: 'auto',
    border: '1px solid #444',
    borderRadius: '8px',
    backgroundColor: '#f5f5f5',
    position: 'relative',
    '@media (max-width: 768px)': {
      height: 'calc(100vh - 320px)',
      minHeight: '300px',
      maxHeight: '500px',
    },
  },
  imagePreviewContainerFull: {
    marginTop: '0.5rem',
    height: 'calc(100vh - 280px)',
    minHeight: '400px',
    maxHeight: '600px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid #444',
    borderRadius: '8px',
    backgroundColor: '#f5f5f5',
    overflow: 'auto',
    padding: '1rem',
    '@media (max-width: 768px)': {
      height: 'calc(100vh - 320px)',
      minHeight: '300px',
      maxHeight: '500px',
    },
  },
  imagePreviewWrapperFull: {
    maxWidth: '100%',
    maxHeight: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& > div': {
      maxWidth: '100%',
      maxHeight: '100%',
      '& > div': {
        transform: 'scale(0.8)',
        transformOrigin: 'center center',
      },
    },
  },
  previewControls: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '0.5rem',
    padding: '0.5rem 0.75rem',
    backgroundColor: '#2a2a2a',
    borderRadius: '8px',
    flexWrap: 'wrap',
    gap: '0.5rem',
    '@media (max-width: 768px)': {
      padding: '0.4rem 0.5rem',
      marginTop: '0.5rem',
    },
    '@media (max-width: 480px)': {
      padding: '0.3rem 0.4rem',
      marginTop: '0.4rem',
    },
  },
  zoomControls: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem',
    '@media (max-width: 768px)': {
      gap: '0.2rem',
    },
  },
  styleToggleButton: {
    color: '#64B5F6',
    padding: '0.25rem 0.5rem',
    fontSize: '0.75rem',
    textTransform: 'none',
    minWidth: 'auto',
    '&:hover': {
      backgroundColor: 'rgba(100, 181, 246, 0.1)',
    },
  },
  styleSelectorCollapsed: {
    marginTop: '0.5rem',
    padding: '0.5rem',
    backgroundColor: '#2a2a2a',
    borderRadius: '8px',
    maxHeight: '0',
    overflow: 'hidden',
    transition: 'max-height 0.3s ease, padding 0.3s ease',
    '@media (max-width: 768px)': {
      padding: '0.4rem',
    },
  },
  styleSelectorExpanded: {
    marginTop: '0.5rem',
    padding: '0.75rem',
    backgroundColor: '#2a2a2a',
    borderRadius: '8px',
    maxHeight: '200px',
    overflow: 'hidden',
    transition: 'max-height 0.3s ease, padding 0.3s ease',
    '@media (max-width: 768px)': {
      padding: '0.5rem',
      maxHeight: '180px',
    },
  },
  zoomButton: {
    color: '#64B5F6',
    padding: '0.25rem',
    '&:hover': {
      backgroundColor: 'rgba(100, 181, 246, 0.1)',
    },
    '&:disabled': {
      color: '#666',
    },
    '@media (max-width: 768px)': {
      padding: '0.2rem',
    },
  },
  zoomLevel: {
    color: '#e0e0e0',
    minWidth: '45px',
    textAlign: 'center',
    fontSize: '0.75rem',
    fontWeight: '500',
    '@media (max-width: 768px)': {
      minWidth: '40px',
      fontSize: '0.7rem',
    },
  },
  hiddenPreview: {
    position: 'absolute',
    left: '-9999px',
    top: '-9999px',
  },
  contentWrapper: {
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    '@media (max-width: 768px)': {
      padding: '0.75rem',
    },
    '@media (max-width: 480px)': {
      padding: '0.5rem',
    },
  },
};

class ExportDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
      snackbarOpen: false,
      snackbarMessage: '',
      exportedCode: '',
      imageExportStyle: 'grid', // 'grid', 'card', 'strip', 'list', 'palette'
      previewZoom: 0.5, // Default zoom level (50%)
      isFullPreview: false, // Toggle between scrollable and fit-to-view
      showStyleOptions: false, // Collapsible style selector
    };
    this.imagePreviewRef = React.createRef();
    this.handleTabChange = this.handleTabChange.bind(this);
    this.handleCopy = this.handleCopy.bind(this);
    this.handleDownload = this.handleDownload.bind(this);
    this.closeSnackbar = this.closeSnackbar.bind(this);
    this.generateExportCode = this.generateExportCode.bind(this);
    this.handleImageStyleChange = this.handleImageStyleChange.bind(this);
    this.handleZoomIn = this.handleZoomIn.bind(this);
    this.handleZoomOut = this.handleZoomOut.bind(this);
    this.handleZoomReset = this.handleZoomReset.bind(this);
    this.toggleFullPreview = this.toggleFullPreview.bind(this);
    this.toggleStyleOptions = this.toggleStyleOptions.bind(this);
  }

  componentDidMount() {
    this.generateExportCode();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.activeTab !== this.state.activeTab) {
      this.generateExportCode();
    }
  }

  handleTabChange(event, newValue) {
    this.setState({ activeTab: newValue });
  }

  handleImageStyleChange(event) {
    this.setState({ imageExportStyle: event.target.value });
  }

  handleZoomIn() {
    this.setState(st => ({ previewZoom: Math.min(st.previewZoom + 0.1, 1.5) }));
  }

  handleZoomOut() {
    this.setState(st => ({ previewZoom: Math.max(st.previewZoom - 0.1, 0.2) }));
  }

  handleZoomReset() {
    this.setState({ previewZoom: 0.5 });
  }

  toggleFullPreview() {
    this.setState(st => ({ isFullPreview: !st.isFullPreview }));
  }
  toggleStyleOptions() {
    this.setState(st => ({ showStyleOptions: !st.showStyleOptions }));
  }

  generateExportCode() {
    const { palette } = this.props;
    const { activeTab } = this.state;
    const formats = ['css', 'scss', 'json', 'tailwind', 'javascript', 'svg', 'png', 'jpeg'];
    const format = formats[activeTab];

    let code = '';
    try {
      switch (format) {
        case 'css':
          code = exportAsCSS(palette);
          break;
        case 'scss':
          code = exportAsSCSS(palette);
          break;
        case 'json':
          code = exportAsJSON(palette);
          break;
        case 'tailwind':
          code = exportAsTailwind(palette);
          break;
        case 'javascript':
          code = exportAsJavaScript(palette);
          break;
        case 'svg':
          code = exportAsSVG(palette);
          break;
        case 'png':
        case 'jpeg':
          code = `Image export will capture the current palette view.\nClick "Download" to export as ${format.toUpperCase()}.`;
          break;
        default:
          code = '';
      }
    } catch (error) {
      code = `Error generating export: ${error.message}`;
    }

    this.setState({ exportedCode: code });
  }

  async handleCopy() {
    const { exportedCode, activeTab } = this.state;
    const formats = ['css', 'scss', 'json', 'tailwind', 'javascript', 'svg', 'png', 'jpeg'];
    const format = formats[activeTab];

    if (format === 'png' || format === 'jpeg') {
      this.setState({
        snackbarOpen: true,
        snackbarMessage: 'Image formats cannot be copied. Use Download instead.',
      });
      return;
    }

    const success = await copyToClipboard(exportedCode);
    if (success) {
      this.setState({
        snackbarOpen: true,
        snackbarMessage: 'Copied to clipboard!',
      });
    } else {
      this.setState({
        snackbarOpen: true,
        snackbarMessage: 'Failed to copy to clipboard',
      });
    }
  }

  async handleDownload() {
    const { palette, paletteElement, isSelectionExport } = this.props;
    const { activeTab, imageExportStyle } = this.state;
    const formats = ['css', 'scss', 'json', 'tailwind', 'javascript', 'svg', 'png', 'jpeg'];
    const format = formats[activeTab];
    const formatInfo = getExportFormats().find(f => f.id === format);
    const safeName = palette.paletteName.toLowerCase().replace(/\s+/g, '-');

    try {
      if (format === 'png' || format === 'jpeg') {
        if (imageExportStyle === 'palette') {
          // Capture the actual palette view (colors only)
          if (!paletteElement) {
            this.setState({
              snackbarOpen: true,
              snackbarMessage: 'Palette element not found for image export',
            });
            return;
          }
          await exportAsImage(paletteElement, safeName, format, true, null, null);
        } else {
          // Create a hidden full-size export version
          const exportContainer = document.createElement('div');
          exportContainer.style.position = 'absolute';
          exportContainer.style.left = '-99999px';
          exportContainer.style.top = '-99999px';
          exportContainer.style.width = 'auto';
          exportContainer.style.height = 'auto';
          exportContainer.style.overflow = 'visible';
          exportContainer.style.visibility = 'hidden'; // Hidden but still rendered
          exportContainer.setAttribute('data-export-only', 'true');
          document.body.appendChild(exportContainer);

          // Render the export version with isExport=true
          const ImageExportPreviewExport = React.createElement(ImageExportPreview, {
            palette: palette,
            style: imageExportStyle,
            isExport: true,
          });
          
          ReactDOM.render(ImageExportPreviewExport, exportContainer);

          // Wait for render to complete and layout to settle
          await new Promise(resolve => setTimeout(resolve, 300));
          
          // Ensure fonts are loaded
          if (document.fonts && document.fonts.ready) {
            await document.fonts.ready;
          }
          
          // Wait a bit more for all styles to apply
          await new Promise(resolve => setTimeout(resolve, 200));

          try {
            // Capture the export version
            await exportAsImage(exportContainer, safeName, format, false, palette, imageExportStyle);
          } finally {
            // Clean up: remove the export container
            ReactDOM.unmountComponentAtNode(exportContainer);
            if (exportContainer.parentNode) {
              document.body.removeChild(exportContainer);
            }
          }
        }
        
        this.setState({
          snackbarOpen: true,
          snackbarMessage: `${format.toUpperCase()} exported successfully!`,
        });
      } else {
        downloadFile(this.state.exportedCode, `${safeName}.${formatInfo.extension}`, formatInfo.mimeType);
        this.setState({
          snackbarOpen: true,
          snackbarMessage: 'File downloaded successfully!',
        });
      }
    } catch (error) {
      this.setState({
        snackbarOpen: true,
        snackbarMessage: `Export failed: ${error.message}`,
      });
    }
  }

  closeSnackbar() {
    this.setState({ snackbarOpen: false });
  }

  render() {
    const { classes, open, onClose, palette } = this.props;
    const { activeTab, snackbarOpen, snackbarMessage, exportedCode, imageExportStyle, previewZoom, isFullPreview, showStyleOptions } = this.state;
    const formats = getExportFormats();
    const isImageFormat = activeTab >= 6; // PNG and JPEG are last two tabs

    return (
      <>
        <Dialog 
          open={open} 
          onClose={onClose} 
          className={classes.dialog} 
          maxWidth="md" 
          fullWidth
          fullScreen={typeof window !== 'undefined' && window.innerWidth <= 768}
        >
          <DialogTitle className={classes.dialogTitle}>
            <Typography variant="h6">Export Palette</Typography>
          </DialogTitle>

          <DialogContent style={{ padding: 0, display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
            <Tabs
              value={activeTab}
              onChange={this.handleTabChange}
              className={classes.tabs}
              variant="scrollable"
              scrollButtons="auto"
            >
              <Tab label="CSS" />
              <Tab label="SCSS" />
              <Tab label="JSON" />
              <Tab label="Tailwind" />
              <Tab label="JavaScript" />
              <Tab label="SVG" />
              <Tab label="PNG" />
              <Tab label="JPEG" />
            </Tabs>

            <div className={classes.contentWrapper}>
              {isImageFormat ? (
                <>
                  {/* Compact Style Selector - Collapsible */}
                  <div className={classes.previewControls}>
                    <Button
                      size="small"
                      startIcon={<SettingsIcon />}
                      endIcon={this.state.showStyleOptions ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                      onClick={this.toggleStyleOptions}
                      className={classes.styleToggleButton}
                    >
                      Style: {imageExportStyle.charAt(0).toUpperCase() + imageExportStyle.slice(1)}
                    </Button>
                    
                    {imageExportStyle !== 'palette' && (
                      <div className={classes.zoomControls}>
                        <Tooltip title="Zoom out" placement="top" arrow>
                          <span>
                            <IconButton
                              size="small"
                              onClick={this.handleZoomOut}
                              className={classes.zoomButton}
                              disabled={previewZoom <= 0.2}
                            >
                              <ZoomOutIcon fontSize="small" />
                            </IconButton>
                          </span>
                        </Tooltip>
                        <Typography className={classes.zoomLevel} variant="body2">
                          {Math.round(previewZoom * 100)}%
                        </Typography>
                        <Tooltip title="Zoom in" placement="top" arrow>
                          <span>
                            <IconButton
                              size="small"
                              onClick={this.handleZoomIn}
                              className={classes.zoomButton}
                              disabled={previewZoom >= 1.5}
                            >
                              <ZoomInIcon fontSize="small" />
                            </IconButton>
                          </span>
                        </Tooltip>
                        <Tooltip title="Reset zoom" placement="top" arrow>
                          <IconButton
                            size="small"
                            onClick={this.handleZoomReset}
                            className={classes.zoomButton}
                          >
                            <RefreshIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip 
                          title={isFullPreview ? "Scrollable view" : "Fit to view"} 
                          placement="top" 
                          arrow
                        >
                          <IconButton
                            size="small"
                            onClick={this.toggleFullPreview}
                            className={classes.zoomButton}
                          >
                            <AspectRatioIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </div>
                    )}
                  </div>

                  {/* Collapsible Style Options */}
                  <div className={this.state.showStyleOptions ? classes.styleSelectorExpanded : classes.styleSelectorCollapsed}>
                    <FormControl component="fieldset" style={{ width: '100%' }}>
                      <FormLabel component="legend" style={{ color: '#e0e0e0', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
                        Export Style
                      </FormLabel>
                      <RadioGroup
                        value={imageExportStyle}
                        onChange={this.handleImageStyleChange}
                        row
                        style={{ 
                          flexWrap: 'wrap', 
                          gap: '0.25rem',
                          marginTop: '0.25rem',
                        }}
                      >
                        <FormControlLabel
                          value="grid"
                          control={<Radio size="small" style={{ padding: '0.25rem' }} />}
                          label={<span style={{ fontSize: '0.75rem', marginLeft: '0.25rem' }}>Grid</span>}
                        />
                        <FormControlLabel
                          value="card"
                          control={<Radio size="small" style={{ padding: '0.25rem' }} />}
                          label={<span style={{ fontSize: '0.75rem', marginLeft: '0.25rem' }}>Card</span>}
                        />
                        <FormControlLabel
                          value="strip"
                          control={<Radio size="small" style={{ padding: '0.25rem' }} />}
                          label={<span style={{ fontSize: '0.75rem', marginLeft: '0.25rem' }}>Strip</span>}
                        />
                        <FormControlLabel
                          value="list"
                          control={<Radio size="small" style={{ padding: '0.25rem' }} />}
                          label={<span style={{ fontSize: '0.75rem', marginLeft: '0.25rem' }}>List</span>}
                        />
                        <FormControlLabel
                          value="palette"
                          control={<Radio size="small" style={{ padding: '0.25rem' }} />}
                          label={<span style={{ fontSize: '0.75rem', marginLeft: '0.25rem' }}>Palette</span>}
                        />
                      </RadioGroup>
                    </FormControl>
                  </div>

                  {/* Main Preview Area - Takes up most space */}
                  {imageExportStyle !== 'palette' ? (
                    isFullPreview ? (
                      <div className={classes.imagePreviewContainerFull}>
                        <div className={classes.imagePreviewWrapperFull}>
                          <div ref={this.imagePreviewRef} data-export-target="true">
                            <ImageExportPreview palette={palette} style={imageExportStyle} />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className={classes.imagePreviewContainer}>
                        <div 
                          ref={this.imagePreviewRef}
                          data-export-target="true"
                          style={{ 
                            transform: `scale(${previewZoom})`,
                            transformOrigin: 'top left',
                            transition: 'transform 0.2s ease',
                          }}
                        >
                          <ImageExportPreview palette={palette} style={imageExportStyle} />
                        </div>
                      </div>
                    )
                  ) : (
                    <div className={classes.imageNote} style={{ marginTop: '1rem' }}>
                      <Typography variant="body2">
                        Palette view will capture the actual palette interface. Click "Download" to export.
                      </Typography>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <div className={classes.formatInfo}>
                    <Typography variant="body2">{formats[activeTab].description}</Typography>
                  </div>
                  <pre className={classes.codeBlock}>{exportedCode}</pre>
                </>
              )}
            </div>
          </DialogContent>

          <DialogActions className={classes.actions}>
            <Button onClick={onClose} style={{ color: '#aaa' }}>
              Close
            </Button>
            <div>
              {!isImageFormat && (
                <Button
                  onClick={this.handleCopy}
                  startIcon={<FileCopyIcon />}
                  style={{ color: '#64B5F6', marginRight: '0.5rem' }}
                >
                  Copy
                </Button>
              )}
              <Button
                onClick={this.handleDownload}
                startIcon={<GetAppIcon />}
                variant="contained"
                style={{ backgroundColor: '#64B5F6', color: 'white' }}
              >
                Download
              </Button>
            </div>
          </DialogActions>
        </Dialog>

        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={this.closeSnackbar}
          message={snackbarMessage}
          action={
            <IconButton size="small" color="inherit" onClick={this.closeSnackbar}>
              <CloseIcon fontSize="small" />
            </IconButton>
          }
        />
      </>
    );
  }
}

export default withStyles(styles)(ExportDialog);


