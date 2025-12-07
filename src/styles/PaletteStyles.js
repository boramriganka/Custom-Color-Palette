const sizes = {
  // Mobile small
  xs: "(max-width: 480px)",
  // Mobile
  sm: "(max-width: 576px)",
  // Tablet
  md: "(max-width: 768px)",
  // Tablet landscape
  lg: "(max-width: 992px)",
};

export default {
    Palette :{ 
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      backgroundColor: "#121212",
      overflow: "hidden",
    },
    colors:{
      height:"90%",
      overflow: "auto",
      [`@media ${sizes.md}`]: {
        height: "88%",
      },
      [`@media ${sizes.sm}`]: {
        height: "85%",
      },
    },
    goBack:{
        width : "20%",
        // showingfullpalette true: showing all colors of pallete
        // else show only shades
        height: "50%",
        margin : "0 auto",
        display: "inline-block",
        position: "relative",
        cursor: "pointer",
        marginBottom: "-3.5px",
        fontSize: "20px",
        opacity: 1,
        backgroundColor: "#333",
        transition: "background-color 0.3s ease",
        "&:hover": {
          backgroundColor: "#444",
        },
        [`@media ${sizes.lg}`]: {
          width: "25%",
          height: "33.3333%",
        },
        [`@media ${sizes.md}`]: {
          width: "33.3333%",
          height: "25%",
        },
        [`@media ${sizes.sm}`]: {
          width: "50%",
          height: "20%",
        },
    },
    backButton: {
          position: "absolute",
          top: "50%",
          left: "50%",
        width: "120px",
        height: "36px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginLeft: "-60px",
        marginTop: "-18px",
          outline: "none",
          background: "rgba(255,255,255,0.3)",
          fontSize: "1rem",
        color: "white",
          textTransform: "uppercase",
        border: "none",
        borderRadius: "4px",
          textDecoration: "none",
        boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
        transition: "all 0.2s ease-in-out",
        "&:hover": {
          background: "rgba(255,255,255,0.4)",
          transform: "scale(1.05)",
        },
        [`@media ${sizes.md}`]: {
          width: "100px",
          height: "32px",
          marginLeft: "-50px",
          marginTop: "-16px",
          fontSize: "0.85rem",
        },
        [`@media ${sizes.sm}`]: {
          width: "80px",
          height: "28px",
          marginLeft: "-40px",
          marginTop: "-14px",
          fontSize: "0.75rem",
        },
    },
    backIcon: {
        marginRight: "0.5rem",
        fontSize: "1.2rem",
        [`@media ${sizes.md}`]: {
          marginRight: "0.25rem",
          fontSize: "1rem",
        },
        [`@media ${sizes.sm}`]: {
          fontSize: "0.9rem",
        },
    }
  }