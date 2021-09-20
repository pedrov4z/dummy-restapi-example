import { Box, Card, Chip, makeStyles, Typography } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
    box: {
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",

        '& > *': {
            margin: `4px ${theme.spacing(1)}px`
        }
    },
}))

const SortBar: React.FC = () => {
    const classes = useStyles();

    return (
        <Card variant="outlined">
            <Box className={classes.box}>
                <Typography>Sort by:</Typography>

                <Chip clickable label="Name" />

                <Chip clickable label="Age" />

                <Chip clickable label="Salary" />
            </Box>
        </Card>
    );
}

export default SortBar;
