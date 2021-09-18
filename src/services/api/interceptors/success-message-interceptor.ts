import { AxiosResponse } from "axios";
import { toast } from "react-toastify";

export const successMessageResponseInterceptor = (
    response: AxiosResponse
): AxiosResponse => {
    const { method } = response.config;

    switch (method) {
        case 'post':
            toast.success('New employee added');
            break;
        case 'put':
            toast.success('Employee info updated');
            break;
        case 'delete':
            toast.success('Employee removed');
            break;
        default:
            break;
    }

    return response;
};
