import axios from "axios"
import { User } from "../models/User";


export const authorizeUser = async (): Promise<false | User> => {
    const response = await axios.get("http://localhost:3000/api/auth/authorize", {withCredentials: true})
    console.log(response);
    if (response.status === 200) {
        return response.data
    } else return false
}