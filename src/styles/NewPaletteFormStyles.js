import { DRAWER_WIDTH } from '../constants';

const drawerWidth = DRAWER_WIDTH;

const styles = theme => ({
  root: {
    display: "flex",
    backgroundColor: "#121212",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "#1a1a1a",
    color: "#e0e0e0",
    padding: "1rem",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      padding: "0.75rem",
    },
    [theme.breakpoints.down("xs")]: {
      padding: "0.5rem",
    },
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    padding: "0 8px",
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
    [theme.breakpoints.down("sm")]: {
      minHeight: "48px !important",
      padding: "0 4px",
    },
  },
  content: {
    flexGrow: 1,
    height: "calc(100vh - 64px)",
    padding: 0,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
    [theme.breakpoints.down("sm")]: {
      marginLeft: "-100%",
      height: "calc(100vh - 56px)",
    },
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  container: {
    width: "90%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      width: "95%",
    },
  },
  buttons: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "1rem",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      gap: "0.5rem",
      marginBottom: "0.75rem",
    },
  },
  button: {
    margin: "0.5rem",
    [theme.breakpoints.down("sm")]: {
      margin: "0.25rem 0",
      width: "100%",
    },
  },
});

export default styles;
