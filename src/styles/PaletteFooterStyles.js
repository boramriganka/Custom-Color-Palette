export default { 
    PaletteFooter: {
      backgroundColor: "#1a1a1a",
      minHeight: "5vh",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      fontWeight: "500",
      color: "#e0e0e0",
      padding: "0.5rem 1rem",
      boxShadow: "0 -2px 10px rgba(0,0,0,0.1)",
      flexWrap: "wrap",
      gap: "0.5rem",
      fontSize: "0.9rem",
      "@media (max-width: 768px)": {
        padding: "0.5rem",
        fontSize: "0.8rem",
        justifyContent: "center",
      },
      "@media (max-width: 480px)": {
        padding: "0.375rem",
        fontSize: "0.75rem",
      },
    },
    leftSection: {
      display: "flex",
      alignItems: "center",
      "@media (max-width: 768px)": {
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "0.25rem",
      },
    },
    emoji: {
      fontSize: "1.5rem",
      margin: "0 1rem",
      "@media (max-width: 768px)": {
        fontSize: "1.25rem",
        margin: "0 0.5rem",
      },
      "@media (max-width: 480px)": {
        fontSize: "1rem",
        margin: "0 0.25rem",
      },
    },
    accessibilityChip: {
      marginRight: "1rem",
      "@media (max-width: 768px)": {
        marginRight: "0.5rem",
        "& .MuiChip-label": {
          fontSize: "0.7rem",
          padding: "0 6px",
        },
      },
      "@media (max-width: 480px)": {
        marginRight: "0.25rem",
        height: "24px",
        "& .MuiChip-label": {
          fontSize: "0.65rem",
          padding: "0 4px",
        },
      },
    }
  };