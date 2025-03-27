import { createSlice } from "@reduxjs/toolkit";
import toast, { Toaster } from 'react-hot-toast';

export const authenSlice = createSlice({
    name:'authenSlice',
    initialState: {
        isOpenLogin: false,
        userName: localStorage.getItem("userName"),
        isLogin: localStorage.getItem("isLogin"),
    },
    reducers: {
        doLogin: (state,action)=> {
            const {userName,password} = action.payload
            if(userName === "vuongdinhhieu" && password === "1"){
                toast.success('Đăng nhập thành công!');
                localStorage.setItem("userName",userName)
                localStorage.setItem("isLogin",true)
                return {
                    ...state,
                    isOpenLogin:false,
                    userName,
                    isLogin:true,
                }
            }
            else {
                toast.error('Đăng nhập thất bại!');
                return {
                    ...state,
                    isOpenLogin:true,
                    userName:"",
                    isLogin:false,
                }
            }
        },
        updateOpenLogin: (state,action)=> {
            return {
                ...state,
                isOpenLogin: action.payload,
            }
        },
        logOut: (state)=> {
            toast.success("Bạn đã đăng xuất thành công")
            localStorage.removeItem("userName");
            localStorage.removeItem("isLogin")
            return {
                ...state,
                userName:"",
                isLogin: false,
                isOpenLogin:false
            }
        }
    }
})
export const {doLogin,updateOpenLogin,logOut} = authenSlice.actions;
export default authenSlice.reducer;