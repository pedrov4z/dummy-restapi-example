import { Card, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { Employee } from '../../types/Employee';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(1),
        padding: theme.spacing(1)
    },
}));

type EmployeeCardProps = {
    employee: Employee
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({ employee }) => {
    const classes = useStyles();

    return (
        <Card variant="outlined" className={classes.root}>
            <Typography>{employee.profile_image}</Typography>
            <Typography style={{ fontWeight: 'bold' }}>{employee.name}</Typography>
            <Typography>{`${employee.age}yo`}</Typography>
            <Typography>{`${new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'USD'}).format(employee.salary)}/yr`}</Typography>
        </Card>
    );
}

export default EmployeeCard;
