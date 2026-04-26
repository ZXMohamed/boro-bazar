import axios from "axios";
import { useRouter } from "next/navigation";

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    withCredentials: true,
})
api.interceptors.response.use(
    (res) => res,
    (error) => {
        const status = error.response?.status

        if (status === 401) {
            
        }

        return Promise.reject(error)
    }
)