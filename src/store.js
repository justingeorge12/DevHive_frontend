
import { configureStore } from "@reduxjs/toolkit";
import counterreducer from './redux/reducers/counterSlice'
import authreducer from './redux/reducers/authSlice'

const store = configureStore({
    reducer : {
        counter : counterreducer,
        auth : authreducer
    }
})


export default store
