import { useEmployeesContext } from '@/presentation/contexts';
import { Employee } from '@/types';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    makeStyles,
    TextField,
    Typography
} from '@material-ui/core';
import React, { useState } from 'react';

const useStyles = makeStyles((theme) => ({
    root: {},

    paper: {
        margin: 0,
    },

    dialogTitle: {
        '& .MuiTypography-root': {
            fontWeight: 'bold',
        },
    },

    fieldsBox: {
        '& *': {
            marginBottom: theme.spacing(1),
        }
    }
}));

interface EmployeeDialogProps {
    employee?: Employee;
    onClose: () => void;
}

const EmployeeDialog: React.FC<EmployeeDialogProps> = ({
    employee,
    onClose
}) => {
    const classes = useStyles();
    const isCreation = employee === undefined;

    const { addEmployee, changeEmployee } = useEmployeesContext();

    const [formState, setFormState] = useState<Partial<Employee>>(employee !== undefined ? employee : {
        name: '',
        age: 0,
        salary: 0
    });

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>): void => {
        if (typeof formState[e.target.name as keyof Employee] === 'number') {
            setFormState({...formState, [e.target.name]: Number(e.target.value)});
        } else {
            setFormState({...formState, [e.target.name]: e.target.value})
        }
    }

    const handleSubmit = (): void => {
        if (isCreation) {
            const { name, age, salary } = formState as Employee;

            addEmployee({
                employee: {
                    name,
                    age,
                    salary
                }
            }).then(() => {
                onClose();            
            });

        } else {
            changeEmployee({ employee: formState as Employee }).then(() => {
                onClose();
            });
        }
    };

    return (
        <Dialog open PaperProps={{ className: classes.paper }}>
            <DialogTitle className={classes.dialogTitle}>
                <Box mt={1}>
                    <Typography variant="h5">{isCreation ? 'Add employee' : 'Change employee'}</Typography>
                </Box>
            </DialogTitle>

            
            <DialogContent>
                <Box className={classes.fieldsBox} display="flex" flexDirection="column">
                    <TextField variant="outlined" label="Name" name="name" onBlur={handleBlur} defaultValue={formState.name}></TextField>
                    <TextField variant="outlined" label="Age" name="age" onBlur={handleBlur} defaultValue={(formState.age ?? 0) > 0 ? formState.age : ''}></TextField>
                    <TextField variant="outlined" label="Salary" name="salary" onBlur={handleBlur} defaultValue={(formState.salary ?? 0) > 0 ? formState.salary : ''}></TextField>
                </Box>
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose}>
                    Cancel
                </Button>
                <Button color="primary" onClick={handleSubmit}>
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EmployeeDialog;
