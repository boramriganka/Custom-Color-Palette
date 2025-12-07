import React, { Component } from 'react';
import ColorBox from './ColorBox';
import Navbar from './Navbar';
import PaletteFooter from './PaletteFooter';
import ColorSelectionManager from './ColorSelectionManager';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';
import styles from './styles/PaletteStyles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { ColorSelectionContext } from './contexts/ColorSelectionContext';

class SingleColorPalette extends Component {
  static contextType = ColorSelectionContext;
  
  constructor(props) {
    super(props);
    this._shades = this.gatherShades(this.props.palette, this.props.colorId);
    this.state = {
      format: "hex",
    };
    this.paletteRef = React.createRef();
    this.changeFormat = this.changeFormat.bind(this);
    this.handleSelectColor = this.handleSelectColor.bind(this);
  }

  gatherShades(palette, colorToFilterBy) {
    let shades = [];
    let allColors = palette.colors;
    for (let key in allColors) {
      shades = shades.concat(
        allColors[key].filter(color => color.id === colorToFilterBy)
      );
    }
    return shades.slice(1);
  }
  
  changeFormat(val) {
    this.setState({ format: val });
  }
  
  handleSelectColor(color, isSelected) {
    this.context.toggleColor(color, isSelected);
  }

  render() {
    const { classes } = this.props;
    const { format } = this.state;
    const { paletteName, emoji, id } = this.props.palette;
    const { selectedColors, removeColorByIndex, clearColors, isColorSelected } = this.context;
    
    const colorBoxes = this._shades.map(color => {
      const selected = isColorSelected(color[format]);
      return (
        <ColorBox 
          key={color.name} 
          name={color.name} 
          background={color[format]}
          showLink={false}
          showingFullColorPalette={false}
          onSelectColor={this.handleSelectColor}
          isSelected={selected}
        />
      );
    });
    
    return (
      <div className={classes.Palette} ref={this.paletteRef}>
        <Navbar 
          showSlider={false} 
          handleChange={this.changeFormat}
          palette={this.props.palette}
          paletteElement={this.paletteRef.current}
        />
        <div className={classes.colors}>
          {colorBoxes}
          <div className={classes.goBack}>
            <Link to={`/palette/${id}`} className={classes.backButton}>
              <ArrowBackIcon className={classes.backIcon} />
              Back
            </Link>
          </div>
        </div>
        <PaletteFooter paletteName={paletteName} emoji={emoji} colors={this._shades} />
        
        {/* Color Selection Manager */}
        {selectedColors.length > 0 && (
          <ColorSelectionManager
            selectedColors={selectedColors}
            onRemoveColor={removeColorByIndex}
            onClearAll={clearColors}
            paletteName={paletteName}
          />
        )}
      </div>
    );
  }
}

export default withStyles(styles)(SingleColorPalette);
