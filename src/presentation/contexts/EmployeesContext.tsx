import { CrudeEmployeeResponseAdapter } from "@/adapters";
import { api } from "@/services";
import { DeleteRequestParams, DeleteResponse, Employee, GetResponse, PostRequestParams, PostResponse, UpdateRequestParams } from "@/types";
import { AxiosResponse } from "axios";
import React, { createContext, useContext, useState } from "react";

type EmployeesContextData = {
    isLoading: boolean,
    errorMessage?: string,
    employees: Employee[],
    fetchEmployees: () => Promise<AxiosResponse<GetResponse>>,
    addEmployee: (params: PostRequestParams) => Promise<AxiosResponse<PostResponse>>,
    changeEmployee: (params: UpdateRequestParams) => Promise<AxiosResponse>,
    removeEmployee: (params: DeleteRequestParams) => Promise<AxiosResponse<DeleteResponse>>,
    sortBy: (field: "name" | "age" | "salary") => void,
    filters: Array<"nameAsc" | "nameDesc" | "ageAsc" | "ageDesc" | "salaryAsc" | "salaryDesc">
}

const EmployeesContext = createContext<EmployeesContextData>({
    isLoading: true,
    employees: [],
    fetchEmployees: async () => await new Promise(() => {}),
    addEmployee: async () => await new Promise(() => {}),
    changeEmployee: async () => await new Promise(() => {}),
    removeEmployee: async () => await new Promise(() => { }),
    sortBy: () => { },
    filters: [],
})

const EmployeesProvider: React.FC = ({ children }) => {
    const [employees, setEmployees] = useState<Employee[]>([])
    const [errorMessage, setErrorMessage] = useState<Partial<string>>();
    const [filters, setFilters] = useState<EmployeesContextData['filters']>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchEmployees = async (): Promise<AxiosResponse<GetResponse>> => {
        return await new Promise<AxiosResponse<GetResponse>>((resolve, reject) => {
            if (!isLoading) {
                setIsLoading(true)
            }
            
            api.get<GetResponse>('/employees').then(res => {
                if (res.data.status === 'success') {
                    const arr: Employee[] = [];
                    for (const crudeEmployee of (res.data.data)) {
                        arr.push(new CrudeEmployeeResponseAdapter(crudeEmployee).convert())
                    }

                    setEmployees(arr);
                }
                resolve(res);
            })
            .catch(async (error) => {
                setErrorMessage(error.response?.data?.message ?? 'Unknown error');
                reject(error);
            })
            .finally(() => {
                resetFilters();
                setIsLoading(false);
            });
        })
    }

    const addEmployee = async (params: PostRequestParams): Promise<AxiosResponse<PostResponse>> => {
        return await new Promise<AxiosResponse<PostResponse>>((resolve, reject) => {
            const { employee } = params;

            const payload = {
                name: employee.name,
                age: employee.age.toString(),
                salary: employee.salary.toString(),
            }

            api.post<PostResponse>('/create', payload).then((res) => {
                fetchEmployees();
                resolve(res);
            }).catch((error) => {
                reject(error)
            });
        })
    }

    const changeEmployee = async (params: UpdateRequestParams): Promise<AxiosResponse> => {
        return await new Promise<AxiosResponse>((resolve, reject) => {
            const payload = params.employee;

            api.put(`/update/${payload.id}`, payload).then((res) => {
                fetchEmployees();
                resolve(res);
            }).catch((error) => {
                reject(error);
            });
        })
    }
    
    const removeEmployee = async (params: DeleteRequestParams): Promise<AxiosResponse<DeleteResponse>> => {
        return await new Promise<AxiosResponse<DeleteResponse>>((resolve, reject) => {
            const { id } = params;

            api.delete<DeleteResponse>(`/delete/${id}`).then((res) => {
                setEmployees(employees.filter(e => e.id !== id));
                resolve(res);
            }).catch((error) => {
                reject(error);
            })
        })
    }

    const resetFilters = (): void => {
        if (filters.length > 0) {
            setFilters([]);
        }
    }

    const sortBy = (field: "name" | "age" | "salary"): void => {
        let invert = false;
        if (filters.includes(`${field}Asc`)) {
            invert = true;
        }

        resetFilters();

        setEmployees(employees.sort((a, b) => {
            if (a[field] > b[field]) {
                return invert ? -1 : 1;
            } else if (a[field] < b[field]) {
                return invert ? 1 : -1;
            }

            return 0;
        }));

        setFilters([invert ? `${field}Desc` : `${field}Asc`]);
    }

    return (
        <EmployeesContext.Provider value={{
            employees,
            isLoading,
            errorMessage,
            fetchEmployees,
            addEmployee,
            changeEmployee,
            removeEmployee,
            sortBy,
            filters
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
        addEmployee,
        changeEmployee,
        removeEmployee,
        sortBy,
        filters
    } = context;
    return {
        employees,
        isLoading,
        errorMessage,
        fetchEmployees,
        addEmployee,
        changeEmployee,
        removeEmployee,
        sortBy,
        filters
    }
}

export default EmployeesProvider;