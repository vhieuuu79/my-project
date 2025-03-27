import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

export const cartSlice = createSlice({
    name: 'cartSlice',
    initialState: {
        listCart: localStorage.getItem("listCart"),
        cartState: false,
        searchProduct: []
    },
    reducers: {
        addToCart: (state,action)=> {
            toast.success(`${action.payload.title} được thêm thành công`)
            const isCheck = (state.listCart ?? []).some((pro)=> pro.id === action.payload.id);
           if(!isCheck){
            return {
                ...state,
                listCart: [...(state.listCart ?? []), action.payload]
            }
           }
           else {
            const updateListCart =( state.listCart??[]).map(item=> 
                item.id === action.payload.id? {...item,quatity: item.quatity + 1} : item
            )
            return {
                ...state,
                listCart: updateListCart
            }
           }
        },
        removeCart:(state,action)=> {
            toast.success("Xoá thành công");
            const updateListCart = state.listCart.filter(item=> 
                item.id !== action.payload
            )
            return {
              ...state,
              listCart:updateListCart,
            }
        },
        reduceCart: (state,action)=> {
            const isCheck = state.listCart.find((pro)=> pro.id === action.payload.id);
            if(isCheck.quatity<2){
                const updateListCart = state.listCart.filter(item=> 
                    item.id !== action.payload.id
                )
                return {
                    ...state,
                  listCart:updateListCart,
                }
            }
            else {
             const updateListCart = state.listCart.map(item=> 
                 item.id === action.payload.id? {...item,quatity: item.quatity - 1} : item
             )
             return {
                 ...state,
                 listCart: updateListCart
             }
            }
         },
         logOutClear: (state)=> {
            localStorage.removeItem("listCart")
            return {
                ...state,
                listCart:[]
            }
         },
         setCartState: (state,action)=> {
           return {
            ...state,
            cartState: action.payload,
           } 
         },
         searchListProduct: (state,action)=> {
            return {
                ...state,
                searchProduct:action.payload.products,
            }
         }
    }
})
export const {addToCart,removeCart,reduceCart,logOutClear,setCartState,searchListProduct} = cartSlice.actions;
export default cartSlice.reducer;