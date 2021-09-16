import { Box, Card, CardHeader, makeStyles, Typography } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
    root: {},
}));

type HomeProps = {}

const Home: React.FC<HomeProps> = ({ children }) => {
    const classes = useStyles();

    return (
        <Box className={classes.root}>
            <Card>
                <CardHeader>
                    <Typography>
                        Employees
                    </Typography>
                </CardHeader>
            </Card>
        </Box>
    );
}

export default Home;
