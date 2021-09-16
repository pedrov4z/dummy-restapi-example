import { Employee } from "./Employee";

export interface GetOneRequestParams {
    id: number,
}

export interface PostRequestParams {
    employee: Omit<Employee, "id">,
}

export interface UpdateRequestParams {
    employee: Employee,
}

export interface DeleteRequestParams {
    id: number,
}