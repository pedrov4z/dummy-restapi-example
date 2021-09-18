import { CrudeEmployeeResponseAdapter } from "@/adapters";
import { api } from "@/services";
import { CrudeEmployee, DeleteRequestParams, Employee, GetOneRequestParams, PostRequestParams, UpdateRequestParams } from "@/types";
import React, { createContext, useContext, useState } from "react";

type EmployeesContextData = {
    isLoading: boolean,
    errorMessage?: string,
    employees: Employee[],
    fetchEmployees: () => void,
    fetchEmployee: (params: GetOneRequestParams) => void,
    addEmployee: (params: PostRequestParams) => void,
    changeEmployee: (params: UpdateRequestParams) => void,
    removeEmployee: (params: DeleteRequestParams) => void,
}

const EmployeesContext = createContext<EmployeesContextData>({
    isLoading: true,
    employees: [],
    fetchEmployees: () => {},
    fetchEmployee: () => {},
    addEmployee: () => {},
    changeEmployee: () => {},
    removeEmployee: () => {},
})

const EmployeesProvider: React.FC = ({ children }) => {
    const [employees, setEmployees] = useState<Employee[]>([])
    const [errorMessage, setErrorMessage] = useState<Partial<string>>();
    const [isLoading, setIsLoading] = useState(true);

    const fetchEmployees = (): void => {
        if (!isLoading) {
            setIsLoading(true)
        }
        
        api.get('/employees').then(res => {
            if (res.data.status === 'success') {
                const arr: Employee[] = [];

                for (const crudeEmployee of (res.data.data as CrudeEmployee[])) {
                    arr.push(new CrudeEmployeeResponseAdapter(crudeEmployee).convert())
                }

                setEmployees(arr);
            }
        })
        .catch(error => {
            setErrorMessage(error.response?.data?.message ?? 'Unknown error');
        })
        .finally(() => {
            setIsLoading(false);
        });
    }

    const fetchEmployee = (params: GetOneRequestParams): void => {
        api.get(`/employee/${params.id}`).then(() => {}).catch(() => {});
    }

    const addEmployee = (params: PostRequestParams): void => {
        const { employee } = params;
        const payload = {
            name: employee.name,
            age: employee.age.toString(),
            salary: employee.salary.toString(),
        }
        api.post('/create', payload).then(() => {}).catch(() => {});
    }
    
    const changeEmployee = (params: UpdateRequestParams): void => {
        const payload = params.employee;
        api.put(`/update/${payload.id}`, payload).then(() => {}).catch(() => {})
    }
    
    const removeEmployee = (params: DeleteRequestParams): void => {
        const { id } = params;
        api.delete(`/delete/${id}`)
            .then(() => {
                setEmployees(employees.filter(e => e.id !== id))
            })
            .catch(() => {})
    }

    return (
        <EmployeesContext.Provider value={{
            employees,
            isLoading,
            errorMessage,
            fetchEmployees,
            fetchEmployee,
            addEmployee,
            changeEmployee,
            removeEmployee
        }}>
            { children }
        </EmployeesContext.Provider>
    )
}

export function useEmployeesContext(): EmployeesContextData {
    const context = useContext(EmployeesContext)
    const {
        employees,
        isLoading,
        errorMessage,
        fetchEmployees,
        fetchEmployee,
        addEmployee,
        changeEmployee,
        removeEmployee
    } = context;
    return {
        employees,
        isLoading,
        errorMessage,
        fetchEmployees,
        fetchEmployee,
        addEmployee,
        changeEmployee,
        removeEmployee
    }
}

export default EmployeesProvider;