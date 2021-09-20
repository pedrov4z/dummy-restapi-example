import { useEmployeesContext } from '@/presentation/contexts';
import { Box, Card, Chip, ChipTypeMap, makeStyles, Typography } from '@material-ui/core';
import { ArrowUpward } from '@material-ui/icons';
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

    icon: {
        transition: 'all .2s'
    },

    descIcon: {
        transform: 'rotate(180deg)'
    },

    hidden: {
        display: 'none'
    }
}))

const SortBar: React.FC = () => {
    const classes = useStyles();
    const { filters, sortBy } = useEmployeesContext();

    const isSelected = (field: string): boolean => {
        if (filters.find(x => x.includes(field))) {
            return true;
        }

        return false;
    }

    const getChipColor = (field: string): ChipTypeMap['props']['color'] => {
        if (isSelected(field)) {
            return 'primary';
        }

        return undefined;
    }

    const getChipIconClassName = (field: string): string => {
        if (filters.find(x => x === `${field}Asc`)) {
            return classes.icon;
        } else if (filters.find(x => x === `${field}Desc`)) {
            return `${classes.icon} ${classes.descIcon}`;
        }

        return classes.hidden;
    }

    const getChipIcon = (field: string): ChipTypeMap['props']['icon'] => {
        return React.createElement(ArrowUpward, {
            className: getChipIconClassName(field),
            fontSize: "small"
        })
    }

    return (
        <Card variant="outlined">
            <Box className={classes.box}>
                <Typography>Sort by:</Typography>

                <Chip
                    clickable
                    color={getChipColor('name')}
                    icon={getChipIcon('name')}
                    label="Name"
                    onClick={() => sortBy('name')}
                />

                <Chip
                    clickable
                    color={getChipColor('age')}
                    icon={getChipIcon('age')}
                    label="Age"
                    onClick={() => sortBy('age')}
                />

                <Chip
                    clickable
                    color={getChipColor('salary')}
                    icon={getChipIcon('salary')}
                    label="Salary"
                    onClick={() => sortBy('salary')}
                />
            </Box>
        </Card>
    );
}

export default SortBar;
