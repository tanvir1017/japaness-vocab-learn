import { axiosAPI } from "@/components/api/axios";

export const fetcher = (url: string) => axiosAPI.get(url);
