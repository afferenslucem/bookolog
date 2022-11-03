import axios from "axios";
import env from "../../environment";

export const httpClient = axios.create({
    baseURL: env().baseUrl,
    withCredentials: true,
})
