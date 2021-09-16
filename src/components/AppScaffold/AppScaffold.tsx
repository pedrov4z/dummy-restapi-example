import { Box, makeStyles } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
    root: {},
}));

type AppScaffoldProps = {}

const AppScaffold: React.FC<AppScaffoldProps> = ({ children }) => {
    const classes = useStyles();

    return (
        <Box className={classes.root}>
            {/* Content */}
        </Box>
    );
}

export default AppScaffold;
