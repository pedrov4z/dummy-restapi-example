import { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';

export const errorMessageResponseInterceptor = async (error: any): Promise<never> => {
  const response = error.response as AxiosResponse;

  if (response?.data?.message !== undefined) {
    toast.error(response.data.message);
  } else {
    toast.error('Unknown error');
  }

  return await Promise.reject(error);
};
