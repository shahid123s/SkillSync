import axios from "axios"

export const axiosInstance = axios.create({
    baseURL : "http://localhost:5400/api",
    withCredentials: true, 
})


export const adminInstance = axios.create({
    baseURL : "http://localhost:5400/api/admin",
    withCredentials: true, 
})