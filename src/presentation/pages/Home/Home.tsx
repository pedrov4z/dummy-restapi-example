
import { EmployeeCard, EmployeeDialog } from '@/presentation/components';
import { useEmployeesContext } from '@/presentation/contexts';
import { Employee } from '@/types';
import { Box, Button, Card, CardHeader, CircularProgress, Grid, makeStyles, Typography } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { useConfirm } from 'material-ui-confirm';
import React, { useEffect, useState } from 'react';

const useStyles = makeStyles((theme) => ({
    root: {},

    card: {
        padding: theme.spacing(1),
    },
}));

const Home: React.FC = () => {
    const classes = useStyles();
    const confirm = useConfirm();
    const { employees, errorMessage, isLoading, fetchEmployees, changeEmployee, removeEmployee  } = useEmployeesContext();

    const [employeeDialogOpen, setEmployeeDialogOpen] = useState(false);
    const [selectedEmployee, selectEmployee] = useState<Employee | undefined>(undefined);

    const handleNewEmployeeCmd = (): void => {
        setEmployeeDialogOpen(true);
    }

    const handleChangeEmployeeCmd = (employee: Employee): void => {
        selectEmployee(employee);
    }

    const handleCloseDialogCmd = (): void => {
        setEmployeeDialogOpen(false);
        if (selectedEmployee !== undefined) {
            selectEmployee(undefined);
        }
    }

    const handleRemoveEmployeeCmd = (employee: Employee): void => {
        confirm({ description: 'This action is permanent!' })
            .then(() => {
                removeEmployee({ id: employee.id });
            })
            .catch(() => { });
    }

    useEffect(() => {
        fetchEmployees();
    }, []); // eslint-disable-line

    return (
        <Box className={classes.root}>
            <Card className={classes.card}>
                <CardHeader title="Employees" />

                <Box display="flex" justifyContent="flex-end" alignItems="center">
                    <Button disabled={isLoading} onClick={handleNewEmployeeCmd} startIcon={<Add />}>New</Button>
                </Box>

                {(employeeDialogOpen || selectedEmployee !== undefined) && <EmployeeDialog onClose={handleCloseDialogCmd} employee={selectedEmployee} />}

                {isLoading ? (
                    <Box display="flex" justifyContent="center" alignItems="center">
                        <CircularProgress />
                    </Box>
                ) : (
                    <>
                        {errorMessage ? (
                            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                                <Typography color="error">{errorMessage}</Typography>
                                <Button color="primary" onClick={() => document.location.reload()} variant="contained">Try again</Button>    
                            </Box>
                        ) : (
                            <Grid container>
                                {employees.map(employee => (
                                    <EmployeeCard key={employee.id} employee={employee} onEditClick={() => handleChangeEmployeeCmd(employee)} onRemoveClick={() => handleRemoveEmployeeCmd(employee)} />
                                ))}
                            </Grid>            
                        )}
                    </>
                )}
            </Card>
        </Box>
    );
}

export default Home;
