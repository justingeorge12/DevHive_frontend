
import { createSlice } from '@reduxjs/toolkit'

const counterSlice = createSlice({
    name : 'counter',
    initialState : 20,
    reducers : {
        increment : (state) => state + 2,
        decrement : (state) => state - 2
    }
})


export const {increment, decrement} = counterSlice.actions
export default counterSlice.reducer





// import {configureStore} from '@reduxjs/toolkit'

// const counterSlice = configureStore({
//     name : 'counter',
//     initialState : 20,
//     reducer : {
//         'increment' : (state) => state + 2,
//         'decrement' : (state) => state - 2
//     }
// })


// export const [increment, decrement] = counterSlice.action
// export default initialState.reducer