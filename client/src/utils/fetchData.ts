import axiosInstance from "./axiosInstance";
import { AxiosRequestConfig, AxiosError } from "axios";

interface FetchDataInterface<RequestType> {
  url: string;
  method?: AxiosRequestConfig["method"];
  data?: RequestType;
  params?: AxiosRequestConfig["params"];
}
 
async function fetchData<RequestType, ResponseType>({
  url,
  method = "GET",
  data,
  params,
}: FetchDataInterface<RequestType>): Promise<{ resData: ResponseType | null; error: string | null }> {
  try {
    const response = await axiosInstance({
      url,
      method,
      params,
      data,
    });

    return {
      resData: response.data as ResponseType,
      error: null,
    };
  } catch (err) {
    const axiosError = err as AxiosError;
    return {
      resData: null,
      error: ((axiosError.response?.data as { message?: string })?.message ?? axiosError.message) || "An error occurred",
      // error: axiosError.response?.data?.message || axiosError.message || "An error occurred",
    };
  }
}

export default fetchData;
