import { createMuiTheme } from "@material-ui/core/styles";
export default createMuiTheme({
  typography: {
    tab: {
      textTransform: "none",
      fontSize: "1rem",
    },
    button: {
      textTransform: "none",
    },
  },
  palette: {
    primary: {
      main: "#ff4400",
      mainGradient: "linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0))",
    },
  },
  breakpoints: {
    values: {
      sm: 750,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});
