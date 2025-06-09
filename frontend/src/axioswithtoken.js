import axios from "axios";
let token = sessionStorage.getItem('token')
export const axioswithtoken = axios.create({
    headers: {
       "Authorization": `Bearer ${token}`
    }
});