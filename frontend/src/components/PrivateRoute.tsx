import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/urls";
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({children}: any) => {
     useEffect(() => {
       axios.get(BASE_URL + "verify-token").then(res => {
        if(res.status === 200){
            return children
        } else{
            return <Navigate to={"login"} replace/>
        }
       }).catch(err => console.log(err));
     }, [])
    return (
        <></>
    )
}