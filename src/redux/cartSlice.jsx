import { createSlice } from "@reduxjs/toolkit";

// const localData = JSON.parse(localStorage.getItem('cart'));
// const initialState = Array.isArray(localData)
//   ? localData
//   : (localData?.cart ?? []);

let initialState = [];

try {
  const localData = JSON.parse(localStorage.getItem('cart'));
  initialState = Array.isArray(localData) ? localData : localData?.cart ?? [];
} catch (e) {
  console.error("Invalid cart data in localStorage", e);
  initialState = [];
}


// console.log(localData)

const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers:{
        addToCart(state,action){
            state.push(action.payload);
        },
        deleteFromCart(state,action){
            return state.filter(item => item.id != action.payload.id);
        }
    }
});

// console.log(cartSlice.cart);

export const {addToCart,deleteFromCart} = cartSlice.actions;

export default cartSlice.reducer

