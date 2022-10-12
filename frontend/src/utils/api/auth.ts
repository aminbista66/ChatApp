import axios from "axios"; 
import { BASE_URL } from "../urls";
import { UserCredential } from "../types";

export const login = ({ username, password }: UserCredential) => {
    axios.post(BASE_URL + "login/", {username, password}).then(res => {
        localStorage.setItem("user_data", JSON.stringify(res.data.data));
        console.log(res)
    }).catch(err => {
        console.log(err);
    });
}