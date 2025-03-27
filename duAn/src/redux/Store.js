import { combineReducers, configureStore } from "@reduxjs/toolkit";
import productSlice from "./Redux";
import authenSlice from "./authenSlice/AuthenSlice";
import cartSlice  from "./cartSlice/CartSlice";
const reducer = combineReducers({
    productSlice,
    authenSlice,
    cartSlice,
})
const store = configureStore({
    reducer,
});
export default store;