import { configureStore } from "@reduxjs/toolkit";
// import {cartSlice} from './cartSlice'
import cartReducer from './cartSlice'; // ✅ Correct

export const store = configureStore({
    reducer:{
        cart: cartReducer
    },
    devTools:true
});