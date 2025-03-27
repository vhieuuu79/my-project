import { createSlice } from "@reduxjs/toolkit";
export const productSlice = createSlice({
    name:"productSlice",
    initialState: {
        products: [],
        newArrivals:[],
    },
    reducers: {
    getProduct: (state,action)=> {
                return {
                    ...state,
                    products:action.payload.products,
                }
            },
    }
    
})
export const {getProduct} = productSlice.actions;
export default productSlice.reducer;