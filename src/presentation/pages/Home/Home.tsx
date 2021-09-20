
import { EmployeeCard, EmployeeDialog, SortBar } from '@/presentation/components';
import { useEmployeesContext } from '@/presentation/contexts';
import { Employee } from '@/types';
import { Box, Button, Card, CircularProgress, Grid, makeStyles, Typography } from '@material-ui/core';
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
    const { employees, errorMessage, isLoading, fetchEmployees, removeEmployee  } = useEmployeesContext();

    const [employeeDialogOpen, setEmployeeDialogOpen] = useState(false);
    const [selectedEmployee, selectEmployee] = useState<Employee | undefined>(undefined);

    const handleNewEmployeeCmd = (): void => {
        setEmployeeDialogOpen(true);
    }

    const handleSelectEmployeeCmd = (employee: Employee): void => {
        selectEmployee(employee);
    }

    const handleCloseDialogCmd = (): void => {
        setEmployeeDialogOpen(false);
        if (selectedEmployee !== undefined) {
            selectEmployee(undefined);
        }
    }

    const handleRemoveEmployeeCmd = (employee: Employee): void => {
        confirm({ description: 'This action is permanent!' }).then(() => {
            removeEmployee({ id: employee.id });
        });
    }

    useEffect(() => {
        fetchEmployees();
    }, []); // eslint-disable-line

    return (
        <Box className={classes.root}>
            <Card className={classes.card}>
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Typography variant="h5">
                        Employees
                    </Typography>

                    <Button
                        disabled={isLoading}
                        onClick={handleNewEmployeeCmd}
                        startIcon={<Add />}
                    >
                        New
                    </Button>
                </Box>

                {(employeeDialogOpen || selectedEmployee !== undefined) && (
                    <EmployeeDialog
                        onClose={handleCloseDialogCmd}
                        employee={selectedEmployee}
                    />
                )}

                {isLoading ? (
                    <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        m={1}
                    >
                        <CircularProgress />
                    </Box>
                ) : (
                    <>
                        {errorMessage ? (
                            <Box
                                display="flex"
                                flexDirection="column"
                                justifyContent="center"
                                alignItems="center"
                                m={1}    
                            >
                                <Typography color="error">{errorMessage}</Typography>
                                    <Button
                                        color="primary"
                                        onClick={() => document.location.reload()}
                                        variant="contained"
                                    >
                                        Try again
                                    </Button>
                            </Box>
                        ) : (
                            <Grid container>
                                <Grid item xs={12}>
                                    <Box marginY={1}>
                                        <SortBar />
                                    </Box>
                                </Grid>
                                        
                                {employees.map(employee => (
                                    <EmployeeCard
                                        key={employee.id}
                                        employee={employee}
                                        onEditClick={() => handleSelectEmployeeCmd(employee)}
                                        onRemoveClick={() => handleRemoveEmployeeCmd(employee)}
                                    />
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
