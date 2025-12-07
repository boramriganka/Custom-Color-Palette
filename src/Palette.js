import React, { Component } from "react";
import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
import { withStyles } from '@material-ui/styles';
import styles from './styles/PaletteStyles';
import PaletteFooter from './PaletteFooter';
import ColorSelectionManager from './ColorSelectionManager';
import { ColorSelectionContext } from './contexts/ColorSelectionContext';
import MetaTags from './components/MetaTags';

class Palette extends Component {
  static contextType = ColorSelectionContext;
  
  constructor(props) {
    super(props);
    this.state = {
      level: 500,
      format: "hex",
    };
    this.paletteRef = React.createRef();
    this.changeLevel = this.changeLevel.bind(this);
    this.changeFormat = this.changeFormat.bind(this);
    this.handleSelectColor = this.handleSelectColor.bind(this);
  }
  
  changeLevel(level) {
    this.setState({ level });
  }
  
  changeFormat(val) {
    this.setState({ format: val });
  }
  
  handleSelectColor(color, isSelected) {
    this.context.toggleColor(color, isSelected);
  }
  
  render() {
    const { colors, paletteName, emoji, id } = this.props.palette;
    const { classes } = this.props;
    const { level, format } = this.state;
    const { selectedColors, removeColorByIndex, clearColors, isColorSelected } = this.context;
    
    const colorBoxes = colors[level].map((color) => {
      const selected = isColorSelected(color[format]);
      return (
        <ColorBox 
          key={color.id} 
          background={color[format]} 
          name={color.name} 
          id={color.id}
          paletteId={id}
          showLink={true}
          showingFullColorPalette={true}
          onSelectColor={this.handleSelectColor}
          isSelected={selected}
        />
      );
    });
    
    return (
      <>
        <MetaTags
          title={`${paletteName} - Color Palette`}
          description={`Explore the ${paletteName} color palette with ${colors[level].length} shades. View color codes, test accessibility, and export in multiple formats.`}
          keywords={`${paletteName}, color palette, ${colors[level].map(c => c.name).join(', ')}, color scheme, design colors`}
          url={window.location.href}
        />
        <div className={classes.Palette} ref={this.paletteRef}>
          <Navbar
            showSlider={true}
            level={level} 
            changeLevel={this.changeLevel}
            handleChange={this.changeFormat}
            palette={this.props.palette}
            paletteElement={this.paletteRef.current}
          />
          <div className={classes.colors}>
            {colorBoxes}
          </div>
          <PaletteFooter paletteName={paletteName} emoji={emoji} colors={colors[level]} />
          
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
      </>
    );
  }
}

export default withStyles(styles)(Palette);
