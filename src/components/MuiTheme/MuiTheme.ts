import { createTheme } from "@material-ui/core";
import { blue, grey } from "@material-ui/core/colors";

export const muiTheme = createTheme({
    palette: {
        primary: {
            main: blue[500]
        },
        secondary: {
            main: grey[500]
        }
    }
});