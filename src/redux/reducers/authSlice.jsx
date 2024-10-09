
import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name : 'auth',
    initialState : {
        role : localStorage.getItem('role') 
    },
    
    reducers : {
        
    }
})

export default authSlice.reducer