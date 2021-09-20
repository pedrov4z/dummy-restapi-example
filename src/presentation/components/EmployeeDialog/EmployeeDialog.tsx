import { makeEmployeeValidation } from "@/main/factories/employees-form-validation-factory";
import { CurrencyInput } from "@/presentation/components";
import { useEmployeesContext } from "@/presentation/contexts";
import { Employee } from "@/types";
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
} from "@material-ui/core";
import React, { useMemo, useState } from "react";

const useStyles = makeStyles((theme) => ({
    root: {},

    paper: {
        margin: 0,
    },

    dialogTitle: {
        "& .MuiTypography-root": {
            fontWeight: "bold",
        },
    },

    fieldsBox: {
        "& .MuiTextField-root": {
            marginBottom: theme.spacing(2),
        },
    },
}));

interface EmployeeDialogProps {
    employee?: Employee;
    onClose: () => void;
}

const EmployeeDialog: React.FC<EmployeeDialogProps> = ({
    employee,
    onClose,
}) => {
    const classes = useStyles();
    const isCreation = employee === undefined;
    const validation = makeEmployeeValidation();

    const { addEmployee, changeEmployee } = useEmployeesContext();

    const initialValues = {
        name: "",
        age: 0,
        salary: 0,
    };

    const initialErrors = {
        nameError: "",
        ageError: "",
        salaryError: "",
    };

    const initialTouched = {
        nameTouched: false,
        ageTouched: false,
        salaryTouched: false,
    };

    const [formState, setFormState] = useState(
        employee !== undefined
            ? {
                  isLoading: false,
                  ...employee,
                  ...initialErrors,
                  ...initialTouched,
              }
            : {
                  isLoading: false,
                  ...initialValues,
                  ...initialErrors,
                  ...initialTouched,
              }
    );

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>): void => {
        if (typeof formState[e.target.name as keyof Employee] === "number") {
            setFormState({
                ...formState,
                [e.target.name]: Number(e.target.value),
                [`${e.target.name}Touched`]: true
            });
        } else {
            setFormState({
                ...formState,
                [e.target.name]: e.target.value,
                [`${e.target.name}Touched`]: true
            });
        }
    };

    const handleSubmit = (): void => {
        if (formState.isLoading || formState.nameError || formState.ageError || formState.salaryError) {
            return
        }

        setFormState({ ...formState, isLoading: true });

        if (isCreation) {
            const { name, age, salary } = formState as Employee;

            addEmployee({
                employee: {
                    name,
                    age,
                    salary,
                },
            }).then(() => {
                onClose();
            }).catch(() => {
                setFormState({ ...formState, isLoading: false });
            });
        } else {
            changeEmployee({ employee: formState as Employee }).then(() => {
                onClose();
            }).catch(() => {
                setFormState({ ...formState, isLoading: false });
            });
        }
    };

    useMemo(() => {
        setFormState({
            ...formState,
            nameError: validation.validate("name", formState.name),
            ageError: validation.validate("age", formState.age.toString()),
            salaryError: validation.validate(
                "salary",
                formState.salary.toString()
            ),
        });
    }, [formState.name, formState.age, formState.salary]);

    return (
        <Dialog open PaperProps={{ className: classes.paper }}>
            <DialogTitle className={classes.dialogTitle}>
                <Box mt={1}>
                    <Typography variant="h5">
                        {isCreation ? "Add employee" : "Change employee"}
                    </Typography>
                </Box>
            </DialogTitle>

            <DialogContent>
                <Box
                    className={classes.fieldsBox}
                    display="flex"
                    flexDirection="column"
                >
                    <TextField
                        variant="outlined"
                        label="Name"
                        name="name"
                        onBlur={handleBlur}
                        defaultValue={formState.name}
                        error={formState.nameTouched && Boolean(formState.nameError)}
                        helperText={formState.nameTouched && formState.nameError}
                    />
                    <TextField
                        variant="outlined"
                        label="Age"
                        name="age"
                        onChange={e => {
                            const value = e.target.value.replace(/[^0-9]+/g, '');

                            e.target.value = value;
                        }}
                        onBlur={handleBlur}
                        defaultValue={
                            (formState.age ?? 0) > 0 ? formState.age : ""
                        }
                        error={formState.ageTouched && Boolean(formState.ageError)}
                        helperText={formState.ageTouched && formState.ageError}
                    />
                    <CurrencyInput
                        variant="outlined"
                        label="Salary"
                        name="salary"
                        onBlur={handleBlur}
                        defaultValue={
                            (formState.salary ?? 0) > 0 ? formState.salary : ""
                        }
                        error={formState.salaryTouched && Boolean(formState.salaryError)}
                        helperText={formState.salaryTouched && formState.salaryError}
                    />
                </Box>
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button color="primary" disabled={formState.isLoading} onClick={handleSubmit}>
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EmployeeDialog;
