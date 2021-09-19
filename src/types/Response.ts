import { CrudeEmployee, Employee } from "@/types";

interface BaseResponse {
    status: string,
}

export interface GetResponse extends BaseResponse {
    data: CrudeEmployee[],
}

export interface PostResponse extends BaseResponse {
    data: Employee,
}

export interface DeleteResponse extends BaseResponse {
    message: string,
}