import chroma from 'chroma-js' 

const sizes = {
  // Mobile small
  xs: "(max-width: 480px)",
  // Mobile
  sm: "(max-width: 576px)",
  // Tablet
  md: "(max-width: 768px)",
  // Tablet landscape
  lg: "(max-width: 992px)",
  // Desktop
  xl: "(max-width: 1200px)",
};

export default {
    ColorBox:{
      width : "20%",
      // showingfullpalette true: showing all colors of pallete
      // else show only shades
      height: props => props.showingFullColorPalette ?"25%":"50%",
      margin : "0 auto",
      display: "inline-block",
      position: "relative",
      cursor: "pointer",
      marginBottom: "-3.5px",
      fontSize: "20px",
      transition: "transform 0.2s ease-in-out",
      "&:hover": {
        transform: "scale(1.02)",
        zIndex: "5",
      },
      "&:hover button":{
        opacity: 1,
        transform: "scale(1)",
      },
      "&:hover $selectButton": {
        opacity: 1,
      },
      // Responsive widths for full palette (5x4 grid)
      [`@media ${sizes.xl}`]: {
        width: "25%",
        height: props => props.showingFullColorPalette ? "20%" : "33.3333%",
      },
      [`@media ${sizes.lg}`]: {
        width: "25%",
        height: props => props.showingFullColorPalette ? "20%" : "33.3333%",
      },
      [`@media ${sizes.md}`]: {
        width: "33.3333%",
        height: props => props.showingFullColorPalette ? "14.2857%" : "25%",
      },
      [`@media ${sizes.sm}`]: {
        width: "50%",
        height: props => props.showingFullColorPalette ? "10%" : "20%",
      },
      [`@media ${sizes.xs}`]: {
        width: "50%",
        height: props => props.showingFullColorPalette ? "10%" : "20%",
      },
    },
    copyText : {
     color: props => chroma(props.background).luminance() >= 0.7 ? "rgba(0,0,0,0.7)" : "white",
     fontWeight: "500",
     [`@media ${sizes.md}`]: {
       fontSize: "0.9rem",
     },
     [`@media ${sizes.sm}`]: {
       fontSize: "0.8rem",
     },
    }, 
      
    colorName: {
      color : props => chroma(props.background).luminance() <= 0.08 ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.7)",
      fontWeight: "500",
      [`@media ${sizes.md}`]: {
        fontSize: "10px",
      },
      [`@media ${sizes.sm}`]: {
        fontSize: "9px",
      },
    },
  
    seeMore :{
      color : props => chroma(props.background).luminance() >= 0.7 ? "rgba(0,0,0,0.7)" : "white",
      background:"rgba(255,255,255,0.3)",
      position:"absolute",
      border :"none",
      right:"0px",
      bottom:"0px",
      width:"60px",
      height:"30px",
      textAlign:"center",
      lineHeight:"30px",
      textTransform:"uppercase",
      borderTopLeftRadius: "5px",
      transition: "all 0.3s ease",
      fontSize: "12px",
      "&:hover": {
        background: "rgba(255,255,255,0.5)",
      },
      [`@media ${sizes.md}`]: {
        width: "50px",
        height: "25px",
        lineHeight: "25px",
        fontSize: "10px",
      },
      [`@media ${sizes.sm}`]: {
        width: "45px",
        height: "22px",
        lineHeight: "22px",
        fontSize: "9px",
      },
    },
    copyButton:{
      position:" absolute",
      top:" 50%",
      left:" 50%",
      width:" 100px",
      height:" 36px",
      display:" inline-block",
      marginLeft:" -50px",
      marginTop:" -18px",
      textAlign:" center",
      outline:" none",
      background:" rgba(255,255,255,0.3)",
      fontSize:" 1rem",
      lineHeight:" 36px",
      color: props => chroma(props.background).luminance() >= 0.7 ? "rgba(0,0,0,0.7)" : "white",
      textTransform:" uppercase",
      border:"none",
      borderRadius: "4px",
      textDecoration:" none",
      opacity: 0,
      transform: "scale(0.95)",
      transition: "all 0.2s ease-in-out",
      boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
      "&:hover": {
        background: "rgba(255,255,255,0.4)",
      },
      [`@media ${sizes.md}`]: {
        width: "80px",
        height: "30px",
        marginLeft: "-40px",
        marginTop: "-15px",
        lineHeight: "30px",
        fontSize: "0.85rem",
        // Always visible on tablets and mobile (no hover on touch devices)
        opacity: 1,
        transform: "scale(1)",
      },
      [`@media ${sizes.sm}`]: {
        width: "70px",
        height: "26px",
        marginLeft: "-35px",
        marginTop: "-13px",
        lineHeight: "26px",
        fontSize: "0.75rem",
        opacity: 1,
        transform: "scale(1)",
      },
    },
    boxContent:{
      position: "absolute",
      width: "100%",
      left: "0px",
      bottom: "0px",
      padding: "10px",
      color: props => chroma(props.background).luminance() <= 0.08 ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.7)",
      letterSpacing: "1px",
      textTransform: "uppercase",
      fontSize: "12px",
      fontWeight: "500",
      [`@media ${sizes.md}`]: {
        padding: "6px",
        fontSize: "10px",
        letterSpacing: "0.5px",
      },
      [`@media ${sizes.sm}`]: {
        padding: "4px",
        fontSize: "8px",
        letterSpacing: "0",
      },
    },
    copyOverlay:{
      opacity: "0",
      zIndex: "0",
      width: "100% ",
      height: "100%",
      transition: ".6s ease-in-out",
      [`@media ${sizes.md}`]: {
        transition: ".4s ease-in-out",
      },
    },
    showOverlay:{
      opacity:"1",
      transform:"scale(50)",
      zIndex: "10",
      position:"absolute",
      [`@media ${sizes.md}`]: {
        transform: "scale(30)",
      },
      [`@media ${sizes.sm}`]: {
        transform: "scale(20)",
      },
    },
    copyMsg:{
      position: "fixed",
      left: "0",
      right: "0",
      top:"0",
      bottom : "0",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "4rem",
      transform: "scale(0.1)",
      color : "white",
      opacity: "0",
      textTransform: "capitalize",
      zIndex: "0",
      "& h1":{
        fontWeight: "700",
        textShadow: "2px 3px 8px rgba(0,0,0,0.6), 0 0 20px rgba(0,0,0,0.3)",
        background: "rgba(255,255,255,0.3)",
        backdropFilter: "blur(8px)",
        width: "100%",
        maxWidth: "600px",
        textAlign: "center",
        marginBottom: "0",
        padding: "1.5rem 1rem",
        letterSpacing: "2px",
        margin: "0 auto",
        color: "white",
        boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
      },
      "& p":{
        fontSize: "2rem",
        fontWeight: "500",
        marginTop: "1.5rem",
        wordBreak: "break-all",
        padding: "0.75rem 2rem",
        background: "rgba(0,0,0,0.4)",
        borderRadius: "12px",
        fontFamily: "'Roboto Mono', monospace",
        letterSpacing: "1px",
        color: "white",
        textShadow: "1px 2px 4px rgba(0,0,0,0.5)",
        boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
      },
      [`@media ${sizes.lg}`]: {
        fontSize: "3rem",
        "& h1": {
          padding: "1.25rem 1rem",
          letterSpacing: "1.5px",
          fontSize: "2.5rem",
          maxWidth: "550px",
        },
        "& p": {
          fontSize: "1.5rem",
          marginTop: "1.25rem",
          padding: "0.6rem 1.5rem",
          maxWidth: "90%",
        },
      },
      [`@media ${sizes.md}`]: {
        fontSize: "2rem",
        "& h1": {
          padding: "1rem 0.75rem",
          letterSpacing: "1px",
          fontSize: "1.75rem",
          maxWidth: "500px",
        },
        "& p": {
          fontSize: "1.1rem",
          marginTop: "1rem",
          padding: "0.5rem 1.25rem",
          maxWidth: "90%",
        },
      },
      [`@media ${sizes.sm}`]: {
        fontSize: "1.5rem",
        "& h1": {
          padding: "0.9rem 0.6rem",
          letterSpacing: "0.5px",
          fontSize: "1.5rem",
          width: "90%",
          maxWidth: "400px",
          background: "rgba(255,255,255,0.35)",
          textShadow: "2px 3px 6px rgba(0,0,0,0.7), 0 0 15px rgba(0,0,0,0.4)",
        },
        "& p": {
          fontSize: "0.95rem",
          marginTop: "0.9rem",
          padding: "0.6rem 1.2rem",
          maxWidth: "90%",
          textAlign: "center",
          background: "rgba(0,0,0,0.5)",
          textShadow: "1px 2px 3px rgba(0,0,0,0.7)",
        },
      },
      [`@media ${sizes.xs}`]: {
        fontSize: "1.25rem",
        "& h1": {
          padding: "0.75rem 0.5rem",
          letterSpacing: "0",
          fontSize: "1.25rem",
          width: "85%",
          maxWidth: "350px",
          background: "rgba(255,255,255,0.35)",
          textShadow: "2px 3px 6px rgba(0,0,0,0.7), 0 0 15px rgba(0,0,0,0.4)",
        },
        "& p": {
          fontSize: "0.85rem",
          marginTop: "0.75rem",
          padding: "0.5rem 1rem",
          maxWidth: "85%",
          textAlign: "center",
          background: "rgba(0,0,0,0.5)",
          textShadow: "1px 2px 3px rgba(0,0,0,0.7)",
        },
      },
    },
    showMessage:{
      opacity: "1",
      transform: "scale(1)",
      zIndex: "25",
      transition: "all 0.4s ease-in-out",
      transitionDelay: "0.3s",
      [`@media ${sizes.md}`]: {
        transition: "all 0.3s ease-in-out",
        transitionDelay: "0.15s",
      },
      [`@media ${sizes.sm}`]: {
        transition: "all 0.25s ease-in-out",
        transitionDelay: "0.1s",
      },
    },
    selectButton: {
      position: "absolute",
      top: "5px",
      right: "5px",
      opacity: 0,
      transition: "all 0.3s ease",
      backgroundColor: "rgba(0,0,0,0.3)",
      padding: "4px",
      "&:hover": {
        backgroundColor: "rgba(0,0,0,0.5)",
        transform: "scale(1.1)",
      },
      [`@media ${sizes.md}`]: {
        top: "3px",
        right: "3px",
        padding: "3px",
        // Always visible on tablets and mobile
        opacity: 0.8,
        "& svg": {
          fontSize: "1rem",
        },
      },
      [`@media ${sizes.sm}`]: {
        top: "2px",
        right: "2px",
        padding: "2px",
        opacity: 0.8,
        "& svg": {
          fontSize: "0.875rem",
        },
      },
    },
  }
  