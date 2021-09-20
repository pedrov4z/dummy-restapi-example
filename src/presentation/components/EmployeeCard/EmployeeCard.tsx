import { toCurrencyValue } from '@/helpers/numberFormat';
import { Employee } from '@/types';
import { Box, Card, Grid, makeStyles, Tooltip, Typography } from '@material-ui/core';
import { blue } from '@material-ui/core/colors';
import { Delete } from '@material-ui/icons';
import React from 'react';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(1),
        padding: theme.spacing(1),

        transition: 'all .2s',

        '&:hover': {
            opacity: .8,
            cursor: 'pointer'
        },

        '&:active': {
            opacity: .9,
            backgroundColor: `${blue[300]}40`
        }
    },

    deleteIcon: {
        transition: 'all .2s',
        
        '&:hover': {
            cursor: 'pointer',
            opacity: .8
        }
    }
}));

type EmployeeCardProps = {
    employee: Employee
    onEditClick: () => void
    onRemoveClick: () => void
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({ employee, onEditClick, onRemoveClick }) => {
    const classes = useStyles();

    return (
        <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card variant="outlined" className={classes.root} onClick={onEditClick}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography style={{ fontWeight: 'bold' }}>{employee.name}</Typography>

                    <Tooltip title="Remove this employee">
                        <Delete
                            className={classes.deleteIcon}
                            color="error"
                            onClick={(e) => {
                                e.stopPropagation();
                                onRemoveClick();
                            }}
                        />
                    </Tooltip>
                </Box>
                <Typography>{`${employee.age}yo`}</Typography>
                <Typography>{`${toCurrencyValue(employee.salary)}/yr`}</Typography>
            </Card>
        </Grid>
    );
}

export default EmployeeCard;
