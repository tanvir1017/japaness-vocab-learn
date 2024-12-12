import { AxiosResponse } from "axios";

export const getNestedData = (response: AxiosResponse) => response?.data;
