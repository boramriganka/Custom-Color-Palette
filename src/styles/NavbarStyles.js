export default {
    Navbar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-start",
      minHeight: "6vh",
      backgroundColor: "#1a1a1a",
      padding: "0.5rem 1rem",
      boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
      flexWrap: "wrap",
      gap: "0.5rem",
      "@media (max-width: 768px)": {
        padding: "0.5rem",
        gap: "0.25rem",
      },
    },  
    logo: {
      marginRight: "15px",
      padding: "0 13px",
      fontSize: "18px",
      fontFamily: "'Roboto', sans-serif",
      fontWeight: "500",
      display: "flex",
      alignItems: "center",
      "& a": {
        textDecoration: "none",
        color: "#f5f5f5",
        transition: "color 0.3s ease",
        "&:hover": {
          color: "#64B5F6",
        },
      },
      "@media (max-width: 768px)": {
        fontSize: "14px",
        marginRight: "10px",
        padding: "0 8px",
      },
      "@media (max-width: 480px)": {
        fontSize: "12px",
        marginRight: "5px",
        padding: "0 4px",
      },
    },
    sliderContainer: {
      display: "flex",
      alignItems: "center",
      "@media (max-width: 768px)": {
        order: 3,
        width: "100%",
        paddingTop: "0.5rem",
      },
    },
    levelLabel: {
      color: "#f5f5f5",
      fontSize: "0.9rem",
      marginRight: "10px",
      whiteSpace: "nowrap",
      "@media (max-width: 768px)": {
        fontSize: "0.8rem",
      },
    },
    slider: {
      width: "340px",
      margin: "0 20px",
      display: "inline-block",
      "& .rc-slider-track": {
        backgroundColor: "#64B5F6",
      },
      "& .rc-slider-rail": {
        height: "6px",
        backgroundColor: "#444",
        borderRadius: "3px",
      },
      "& .rc-slider-handle, .rc-slider-handle:active, .rc-slider-handle:focus, .rc-slider-handle:hover": {
        backgroundColor: "#64B5F6",
        outline: "none",
        border: "2px solid #64B5F6",
        boxShadow: "0 0 0 4px rgba(100, 181, 246, 0.2)",
        width: "16px",
        height: "16px",
        marginLeft: "-8px",
        marginTop: "-5px",
        transition: "box-shadow 0.2s ease-in-out",
      },
      "@media (max-width: 1024px)": {
        width: "200px",
        margin: "0 10px",
      },
      "@media (max-width: 768px)": {
        width: "100%",
        flex: 1,
        margin: "0 10px 0 0",
      },
    },
    selectContainer: {
      marginLeft: "auto",
      marginRight: "0.5rem",
      "& .MuiSelect-select": {
        color: "#f5f5f5",
        fontSize: "0.9rem",
        padding: "0.5rem 1rem",
      },
      "& .MuiInput-underline:before": {
        borderBottom: "1px solid #555",
      },
      "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
        borderBottom: "2px solid #64B5F6",
      },
      "@media (max-width: 768px)": {
        marginLeft: "0",
        marginRight: "0.25rem",
        "& .MuiSelect-select": {
          fontSize: "0.75rem",
          padding: "0.375rem 0.5rem",
          paddingRight: "24px !important",
        },
      },
      "@media (max-width: 480px)": {
        "& .MuiSelect-select": {
          fontSize: "0.7rem",
          padding: "0.25rem 0.375rem",
        },
      },
    },
    iconButton: {
      color: "#f5f5f5",
      marginLeft: "0.25rem",
      padding: "8px",
      transition: "all 0.3s ease",
      "&:hover": {
        backgroundColor: "rgba(100, 181, 246, 0.1)",
        color: "#64B5F6",
      },
      "@media (max-width: 768px)": {
        padding: "6px",
        marginLeft: "0.125rem",
        "& svg": {
          fontSize: "1.25rem",
        },
      },
      "@media (max-width: 480px)": {
        padding: "4px",
        "& svg": {
          fontSize: "1.1rem",
        },
      },
    },
    navActions: {
      display: "flex",
      alignItems: "center",
      marginLeft: "auto",
      "@media (max-width: 768px)": {
        marginLeft: "0",
      },
    },
    menuButton: {
      display: "none",
      color: "#f5f5f5",
      padding: "8px",
      marginRight: "0.5rem",
      transition: "all 0.3s ease",
      "&:hover": {
        backgroundColor: "rgba(100, 181, 246, 0.1)",
        color: "#64B5F6",
      },
      "@media (max-width: 768px)": {
        display: "flex",
        padding: "6px",
        "& svg": {
          fontSize: "1.5rem",
        },
      },
      "@media (max-width: 480px)": {
        padding: "4px",
        marginRight: "0.25rem",
        "& svg": {
          fontSize: "1.25rem",
        },
      },
    },
    backButton: {
      color: "#f5f5f5",
      padding: "8px",
      marginRight: "0.5rem",
      transition: "all 0.3s ease",
      "&:hover": {
        backgroundColor: "rgba(100, 181, 246, 0.1)",
        color: "#64B5F6",
      },
      "@media (max-width: 768px)": {
        padding: "6px",
        marginRight: "0.25rem",
        "& svg": {
          fontSize: "1.25rem",
        },
      },
      "@media (max-width: 480px)": {
        padding: "4px",
        "& svg": {
          fontSize: "1.1rem",
        },
      },
    },
    drawerPaper: {
      width: 280,
      backgroundColor: "#1a1a1a",
      color: "#f5f5f5",
      "@media (max-width: 480px)": {
        width: 260,
      },
    },
    drawerContent: {
      width: "100%",
    },
    drawerHeader: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "1rem 1.5rem",
      backgroundColor: "#121212",
      borderBottom: "1px solid #333",
    },
    drawerTitle: {
      margin: 0,
      fontSize: "1.25rem",
      fontWeight: "500",
      color: "#f5f5f5",
      "@media (max-width: 480px)": {
        fontSize: "1.1rem",
      },
    },
    drawerCloseButton: {
      color: "#f5f5f5",
      padding: "4px",
      "&:hover": {
        backgroundColor: "rgba(100, 181, 246, 0.1)",
        color: "#64B5F6",
      },
    },
    drawerActiveItem: {
      backgroundColor: "rgba(100, 181, 246, 0.15)",
      "&:hover": {
        backgroundColor: "rgba(100, 181, 246, 0.25)",
      },
      "& .MuiListItemIcon-root": {
        color: "#64B5F6",
      },
      "& .MuiListItemText-primary": {
        color: "#64B5F6",
        fontWeight: "500",
      },
    },
    breadcrumb: {
      display: "flex",
      alignItems: "center",
      marginLeft: "0.5rem",
      color: "#aaa",
      fontSize: "0.9rem",
      "@media (max-width: 768px)": {
        display: "none", // Hide breadcrumb on mobile to save space
      },
    },
    breadcrumbSeparator: {
      margin: "0 0.5rem",
      color: "#666",
    },
    breadcrumbText: {
      color: "#f5f5f5",
      maxWidth: "200px",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    },
  };