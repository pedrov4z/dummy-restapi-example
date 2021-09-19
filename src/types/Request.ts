import { Employee } from "@/types";

export interface PostRequestParams {
    employee: Omit<Employee, "id">,
}

export interface UpdateRequestParams {
    employee: Employee,
}

export interface DeleteRequestParams {
    id: number,
}