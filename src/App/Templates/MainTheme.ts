import { createMuiTheme } from "@material-ui/core/styles";

// Create a theme instance.
const MainTheme = createMuiTheme({
    palette: {
        primary: {
          light: "#99E5EA",
          main: "#28A3AF",
          dark: "#037B86",
        },
        secondary: {
          light: "#99E5EA",
          main: "#28A3AF",
          dark: "#037B86",
        },
        success: {
            main: "#03AC63"
        },
        warning: {
            main: "#EE7000"
        },
        error: {
            main: "#E92243"
        },
        info: {
            main: "#28A3AF"
        },
    }
});

export default MainTheme;
