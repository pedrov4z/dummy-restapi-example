import { AppBar, Box, IconButton, makeStyles, Toolbar, Typography, useTheme } from '@material-ui/core';
import { Brightness4 as BrightnessIcon } from '@material-ui/icons';
import React, { useContext } from 'react';
import { ThemeContext } from '../MuiThemeProvider/MuiThemeProvider';

const useStyles = makeStyles((theme) => ({
    root: {},

    appBar: {}
}));

type AppScaffoldProps = {}

const AppScaffold: React.FC<AppScaffoldProps> = ({ children }) => {
    const classes = useStyles();
    const theme = useTheme();
    const setThemeType = useContext(ThemeContext);

    const toggleDarkMode = (): void => theme.palette.type === 'light' ? setThemeType('dark') : setThemeType('light');

    return (
        <Box className={classes.root}>
            <AppBar className={classes.appBar} position="fixed">
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    paddingX={1}
                >
                    <Box>
                        <Typography>Dummy Rest API Example</Typography>
                    </Box>
                    
                    <Box>
                        <IconButton onClick={toggleDarkMode}>
                            <BrightnessIcon />
                        </IconButton>
                    </Box>
                </Box>
            </AppBar>

            <Toolbar />
            
            {children}
        </Box>
    );
}

export default AppScaffold;
