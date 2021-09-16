import { AppBar, Box, IconButton, makeStyles, Toolbar, Typography } from '@material-ui/core';
import { Brightness4 as BrightnessIcon } from '@material-ui/icons';
import React from 'react';

const useStyles = makeStyles((theme) => ({
    root: {},

    appBar: {}
}));

type AppScaffoldProps = {

}

const AppScaffold: React.FC<AppScaffoldProps> = ({ children }) => {
    const classes = useStyles();

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
                        <IconButton>
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
