import { createContext, useContext, useState } from "react";
import { CrudeEmployeeResponseAdapter } from "../adapters/CrudeEmployeeResponseAdapter";
import api from "../services/api";
import { CrudeEmployee, Employee } from "../types/Employee";
import { DeleteRequestParams, GetOneRequestParams, PostRequestParams, UpdateRequestParams } from "../types/Request";

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
    fetchEmployees: () => {
        console.log('Provider not ready !')
    },
    fetchEmployee: () => {},
    addEmployee: () => {},
    changeEmployee: () => {},
    removeEmployee: () => {},
})

const EmployeesProvider: React.FC = ({ children }) => {
    const [employees, setEmployees] = useState<Employee[]>([])
    const [errorMessage, setErrorMessage] = useState<Partial<string>>();
    const [isLoading, setIsLoading] = useState(true);

    const fetchEmployees = () => {
        console.log('Fetching all employees . . .');
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
            setErrorMessage(error.response.data.message)
        })
        .finally(() => {
            setIsLoading(false);
        });
    }

    const fetchEmployee = (params: GetOneRequestParams) => {
        api.get(`/employee/${params.id}`).then().catch();
    }

    const addEmployee = (params: PostRequestParams) => {
        api.post('/create', params.employee).then().catch();
    }
    
    const changeEmployee = (params: UpdateRequestParams) => {
        api.put(`/update/${params.employee.id}`, params.employee).then().catch()
    }
    
    const removeEmployee = (params: DeleteRequestParams) => {
        api.delete(`/delete/${params.id}`).then().catch()
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

export function useEmployeesContext() {
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