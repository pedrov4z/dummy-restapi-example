import { createTheme } from "@material-ui/core";
import { blue, grey } from "@material-ui/core/colors";
import { ThemeProvider } from "@material-ui/core/styles/";
import { default as React, useState } from 'react';

export const ThemeContext = React.createContext<any>(void 0);

const MuiThemeProvider: React.FC = ({ children }) => {
    const [themeType, setThemeType] = useState<"light" | "dark">('light');

    const theme = createTheme({
        palette: {
            type: themeType,
            primary: {
                main: blue[500]
            },
            secondary: {
                main: grey[500]
            }
        }
    })

    return (
        <ThemeContext.Provider value={setThemeType}>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </ThemeContext.Provider>
    );
}
export default MuiThemeProvider;
