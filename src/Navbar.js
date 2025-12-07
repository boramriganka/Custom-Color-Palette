import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/styles";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Dialog from "@material-ui/core/Dialog";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import CloseIcon from "@material-ui/icons/Close";
import MenuIcon from "@material-ui/icons/Menu";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import HomeIcon from "@material-ui/icons/Home";
import PaletteIcon from "@material-ui/icons/Palette";
import AddIcon from "@material-ui/icons/Add";
import AccessibilityNewIcon from "@material-ui/icons/AccessibilityNew";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import styles from "./styles/NavbarStyles";
import ExportButton from "./ExportButton";
import ContrastChecker from "./ContrastChecker";
import PaletteAccessibilityReport from "./PaletteAccessibilityReport";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      format: "hex", 
      open: false,
      accessibilityDialogOpen: false,
      accessibilityView: 'checker', // 'checker' or 'report'
      drawerOpen: false,
    };
    this.handleFormatChange = this.handleFormatChange.bind(this);
    this.closeSnackbar = this.closeSnackbar.bind(this);
    this.openAccessibilityDialog = this.openAccessibilityDialog.bind(this);
    this.closeAccessibilityDialog = this.closeAccessibilityDialog.bind(this);
    this.toggleAccessibilityView = this.toggleAccessibilityView.bind(this);
    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.handleBack = this.handleBack.bind(this);
  }
  handleFormatChange(e) {
    this.setState({ format: e.target.value, open: true });
    this.props.handleChange(e.target.value);
  }
  closeSnackbar() {
    this.setState({ open: false });
  }
  openAccessibilityDialog() {
    this.setState({ accessibilityDialogOpen: true });
  }
  closeAccessibilityDialog() {
    this.setState({ accessibilityDialogOpen: false });
  }
  toggleAccessibilityView() {
    this.setState(st => ({
      accessibilityView: st.accessibilityView === 'checker' ? 'report' : 'checker'
    }));
  }
  toggleDrawer(open) {
    this.setState({ drawerOpen: open });
  }
  handleBack() {
    const { history, palette } = this.props;
    if (palette) {
      // If on a single color palette, go back to full palette
      const path = history.location.pathname;
      if (path.includes('/palette/') && path.split('/').length === 4) {
        // Single color palette: /palette/:id/:colorId
        const paletteId = path.split('/')[2];
        history.push(`/palette/${paletteId}`);
      } else {
        // Full palette: /palette/:id
        history.push('/');
      }
    } else {
      history.push('/');
    }
  }
  render() {
    const { level, changeLevel, showSlider, classes, palette, paletteElement, history } = this.props;
    const { format, accessibilityDialogOpen, accessibilityView, drawerOpen } = this.state;
    const isHomePage = history.location.pathname === '/';
    const isPalettePage = history.location.pathname.startsWith('/palette/') && !history.location.pathname.includes('/new');
    
    // Drawer content
    const drawerContent = (
      <div className={classes.drawerContent}>
        <div className={classes.drawerHeader}>
          <h2 className={classes.drawerTitle}>Navigation</h2>
          <IconButton onClick={() => this.toggleDrawer(false)} className={classes.drawerCloseButton}>
            <CloseIcon />
          </IconButton>
        </div>
        <Divider style={{ backgroundColor: '#333' }} />
        <List style={{ padding: 0 }}>
          <ListItem 
            button 
            component={Link} 
            to="/" 
            onClick={() => this.toggleDrawer(false)}
            className={isHomePage ? classes.drawerActiveItem : ''}
            style={{ 
              color: '#f5f5f5',
              paddingLeft: '1.5rem',
              paddingRight: '1.5rem',
            }}
          >
            <ListItemIcon style={{ color: isHomePage ? '#64B5F6' : '#aaa', minWidth: '40px' }}>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText 
              primary="Home" 
              primaryTypographyProps={{ 
                style: { 
                  color: isHomePage ? '#64B5F6' : '#f5f5f5',
                  fontWeight: isHomePage ? '500' : '400',
                  fontSize: '0.95rem',
                } 
              }}
            />
          </ListItem>
          <ListItem 
            button 
            component={Link} 
            to="/palette/new" 
            onClick={() => this.toggleDrawer(false)}
            style={{ 
              color: '#f5f5f5',
              paddingLeft: '1.5rem',
              paddingRight: '1.5rem',
            }}
          >
            <ListItemIcon style={{ color: '#aaa', minWidth: '40px' }}>
              <AddIcon />
            </ListItemIcon>
            <ListItemText 
              primary="Create Palette" 
              primaryTypographyProps={{ 
                style: { 
                  color: '#f5f5f5',
                  fontSize: '0.95rem',
                } 
              }}
            />
          </ListItem>
          {palette && (
            <>
              <Divider style={{ backgroundColor: '#333', margin: '0.5rem 0' }} />
              <ListItem 
                button 
                onClick={() => {
                  this.openAccessibilityDialog();
                  this.toggleDrawer(false);
                }}
                style={{ 
                  color: '#f5f5f5',
                  paddingLeft: '1.5rem',
                  paddingRight: '1.5rem',
                }}
              >
                <ListItemIcon style={{ color: '#aaa', minWidth: '40px' }}>
                  <AccessibilityNewIcon />
                </ListItemIcon>
                <ListItemText 
                  primary="Accessibility Checker" 
                  primaryTypographyProps={{ 
                    style: { 
                      color: '#f5f5f5',
                      fontSize: '0.95rem',
                    } 
                  }}
                />
              </ListItem>
            </>
          )}
        </List>
      </div>
    );

    return (
      <header className={classes.Navbar}>
        {/* Mobile Hamburger Menu */}
        <IconButton
          className={classes.menuButton}
          onClick={() => this.toggleDrawer(true)}
          aria-label="Open navigation menu"
        >
          <MenuIcon />
        </IconButton>
        
        {/* Back Button - Show when not on home page */}
        {!isHomePage && (
          <Tooltip title="Go back" placement="bottom" arrow>
            <IconButton
              onClick={this.handleBack}
              className={classes.backButton}
              aria-label="Go back"
            >
              <ArrowBackIcon />
            </IconButton>
          </Tooltip>
        )}
        
        <div className={classes.logo}>
          <Link to='/'>customcolor</Link>
        </div>
        
        {/* Breadcrumb - Show on palette pages */}
        {isPalettePage && palette && (
          <div className={classes.breadcrumb}>
            <span className={classes.breadcrumbSeparator}>/</span>
            <span className={classes.breadcrumbText}>{palette.paletteName}</span>
          </div>
        )}
        {showSlider && (
          <Tooltip 
            title="Adjust color shade intensity (100=lightest, 900=darkest)" 
            placement="bottom" 
            arrow
          >
            <div>
              <span>Level: {level}</span>
              <div className={classes.slider}>
                <Slider
                  defaultValue={level}
                  min={100}
                  max={900}
                  step={100}
                  onAfterChange={changeLevel}
                />
              </div>
            </div>
          </Tooltip>
        )}
        <Tooltip 
          title="Change color code format (HEX, RGB, RGBA)" 
          placement="bottom" 
          arrow
        >
          <div className={classes.selectContainer}>
            <Select value={format} onChange={this.handleFormatChange}>
              <MenuItem value='hex'>HEX - #ffffff</MenuItem>
              <MenuItem value='rgb'>RGB - rgb(255,255,255)</MenuItem>
              <MenuItem value='rgba'>RGBA - rgba(255,255,255, 1.0)</MenuItem>
            </Select>
          </div>
        </Tooltip>
        {palette && (
          <>
            <Tooltip 
              title="Check WCAG accessibility & contrast ratios" 
              placement="bottom" 
              arrow
            >
              <IconButton
                onClick={this.openAccessibilityDialog}
                className={classes.iconButton}
              >
                <AccessibilityNewIcon />
              </IconButton>
            </Tooltip>
            <Tooltip 
              title="Export palette in multiple formats (CSS, JSON, PNG, etc.)" 
              placement="bottom" 
              arrow
            >
              <span>
                <ExportButton 
                  palette={palette} 
                  paletteElement={paletteElement}
                  variant="icon"
                />
              </span>
            </Tooltip>
          </>
        )}
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          open={this.state.open}
          autoHideDuration={3000}
          message={
            <span id='message-id'>
              Format Changed To {format.toUpperCase()}
            </span>
          }
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          onClose={this.closeSnackbar}
          action={[
            <IconButton
              onClick={this.closeSnackbar}
              color='inherit'
              key='close'
              aria-label='close'
            >
              <CloseIcon />
            </IconButton>
          ]}
        />
        
        <Dialog
          open={accessibilityDialogOpen}
          onClose={this.closeAccessibilityDialog}
          maxWidth="lg"
          fullWidth
          PaperProps={{
            style: { backgroundColor: '#121212', minHeight: '80vh' }
          }}
        >
          {palette && (
            accessibilityView === 'checker' ? (
              <ContrastChecker />
            ) : (
              <PaletteAccessibilityReport palette={palette} />
            )
          )}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            padding: '1rem',
            backgroundColor: '#1a1a1a',
            borderTop: '1px solid #444'
          }}>
            <IconButton onClick={this.toggleAccessibilityView} style={{ color: '#64B5F6' }}>
              {accessibilityView === 'checker' ? 'View Palette Report' : 'View Contrast Checker'}
            </IconButton>
            <IconButton onClick={this.closeAccessibilityDialog} style={{ color: '#aaa' }}>
              <CloseIcon />
            </IconButton>
          </div>
        </Dialog>
        
        {/* Mobile Drawer */}
        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={() => this.toggleDrawer(false)}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          {drawerContent}
        </Drawer>
      </header>
    );
  }
}
export default withRouter(withStyles(styles)(Navbar));