import { createSlice } from "@reduxjs/toolkit";

const initialState={
    count:0,
    productList: []
}

export const cartSlice=createSlice({
    name:"cart",
    initialState:initialState,
    reducers:{
        addProductToCart:(state,action)=>{
           state.productList=[...state.productList, action.payload];
           state.count += 1;
        },
        removeProductToCart:(state)=>{
            state.productList=[];
            state.count=0 ;       
        },
     
    }
})
export const {addProductToCart,removeProductToCart}=cartSlice.actions;
export default cartSlice.reducer;