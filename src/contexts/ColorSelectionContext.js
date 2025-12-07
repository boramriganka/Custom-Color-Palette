import React, { Component, createContext } from 'react';

// Create context with default values
export const ColorSelectionContext = createContext({
  selectedColors: [],
  addColor: () => {},
  removeColor: () => {},
  removeColorByIndex: () => {},
  clearColors: () => {},
  isColorSelected: () => false,
  toggleColor: () => {},
});

// Provider component that holds the state and provides it to children
export class ColorSelectionProvider extends Component {
  constructor(props) {
    super(props);
    
    // Try to restore from localStorage on initial load
    const savedColors = this.loadFromStorage();
    
    this.state = {
      selectedColors: savedColors || [],
    };
    
    this.addColor = this.addColor.bind(this);
    this.removeColor = this.removeColor.bind(this);
    this.removeColorByIndex = this.removeColorByIndex.bind(this);
    this.clearColors = this.clearColors.bind(this);
    this.isColorSelected = this.isColorSelected.bind(this);
    this.toggleColor = this.toggleColor.bind(this);
  }
  
  loadFromStorage() {
    try {
      const saved = window.localStorage.getItem('selectedColors');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      console.error('Failed to load selected colors from storage:', e);
      return null;
    }
  }
  
  saveToStorage(colors) {
    try {
      window.localStorage.setItem('selectedColors', JSON.stringify(colors));
    } catch (e) {
      console.error('Failed to save selected colors to storage:', e);
    }
  }
  
  addColor(color) {
    this.setState(st => {
      // Check if color already exists (by hex value)
      const exists = st.selectedColors.some(c => c.color === color.color);
      if (exists) return st;
      
      const newColors = [...st.selectedColors, color];
      this.saveToStorage(newColors);
      return { selectedColors: newColors };
    });
  }
  
  removeColor(color) {
    this.setState(st => {
      const newColors = st.selectedColors.filter(c => c.color !== color.color);
      this.saveToStorage(newColors);
      return { selectedColors: newColors };
    });
  }
  
  removeColorByIndex(index) {
    this.setState(st => {
      const newColors = st.selectedColors.filter((_, i) => i !== index);
      this.saveToStorage(newColors);
      return { selectedColors: newColors };
    });
  }
  
  clearColors() {
    this.saveToStorage([]);
    this.setState({ selectedColors: [] });
  }
  
  isColorSelected(colorHex) {
    return this.state.selectedColors.some(c => c.color === colorHex);
  }
  
  toggleColor(color, isCurrentlySelected) {
    if (isCurrentlySelected) {
      this.removeColor(color);
    } else {
      this.addColor(color);
    }
  }
  
  render() {
    const contextValue = {
      selectedColors: this.state.selectedColors,
      addColor: this.addColor,
      removeColor: this.removeColor,
      removeColorByIndex: this.removeColorByIndex,
      clearColors: this.clearColors,
      isColorSelected: this.isColorSelected,
      toggleColor: this.toggleColor,
    };
    
    return (
      <ColorSelectionContext.Provider value={contextValue}>
        {this.props.children}
      </ColorSelectionContext.Provider>
    );
  }
}

export default ColorSelectionContext;

