import { axiosAPI } from "@/api/axios";

export const fetcher = (url: string) => axiosAPI.get(url);
