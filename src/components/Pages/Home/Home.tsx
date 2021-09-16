import { Box, Button, Card, CardHeader, CircularProgress, makeStyles, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useEmployeesContext } from '../../../contexts/EmployeesContext';
import EmployeeCard from '../../EmployeeCard/EmployeeCard';

const useStyles = makeStyles((theme) => ({
    root: {},

    card: {
        paddingBottom: theme.spacing(1),
    },
}));

type HomeProps = {}

const Home: React.FC<HomeProps> = () => {
    const classes = useStyles();
    const { employees, errorMessage, fetchEmployees, isLoading } = useEmployeesContext();

    useEffect(() => {
        fetchEmployees();
    }, []); // eslint-disable-line

    return (
        <Box className={classes.root}>
            <Card className={classes.card}>
                <CardHeader title="Employees" />

                {isLoading ? (
                    <Box display="flex" justifyContent="center" alignItems="center">
                        <CircularProgress />
                    </Box>
                ) : (
                    <>
                        {errorMessage ? (
                            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                                <Typography color="error">{errorMessage}</Typography>
                                <Button color="primary" onClick={fetchEmployees} variant="contained">Try again</Button>    
                            </Box>
                        ) : (
                            <>
                                {employees.map(employee => (
                                    <EmployeeCard key={employee.id} employee={employee} />
                                ))}
                            </>            
                        )}
                    </>
                )}
            </Card>
        </Box>
    );
}

export default Home;
