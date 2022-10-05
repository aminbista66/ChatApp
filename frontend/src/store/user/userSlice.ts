import { createSlice } from "@reduxjs/toolkit";
import { UserDetails } from "../../utils/types";


if(localStorage.getItem("user_data") === null){
    const assertion_data = JSON.stringify({
        username: '',
        first_name: '',
        last_name: '',
        email: '',
    });
    localStorage.setItem("user_data", assertion_data);
}

console.log(localStorage.getItem("user_data"))

const storageData = JSON.parse(localStorage.getItem("user_data") as string);

const initialState: UserDetails = {
    username: storageData.username,
    email: storageData.email,
    firstName: storageData.first_name,
    lastName: storageData.last_name
}


export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        
    },
});

export const {} = userSlice.actions;
export default userSlice.reducer;