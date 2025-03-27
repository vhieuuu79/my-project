import MenuHeader from "./menuHeader/MenuHeader";
import { Route, Routes } from "react-router-dom";
import Products from "./products/Products";
import Home from "./menuHeader/Home";
import serviceApi from "./api/GetApi";
import { getProduct} from "./redux/Redux";
import React, { useEffect } from 'react'
import {useDispatch} from 'react-redux'
import toast, { Toaster } from 'react-hot-toast';
import Profile from "./profile/Profile";
import DetailProduct from "./detailProduct/DetailProduct";
import Search from "./search/Search";

export default function App() {
  const notify = () => toast('Here is your toast.');

  const dispatch = useDispatch();
  const loadDataProducts = async()=> {
    const res = await  serviceApi.getListProduct();
    dispatch(getProduct(res));
  }
  useEffect (()=>{
    loadDataProducts()
  },[])
  return (
    <>
     <Routes>
      <Route path="/" element={<MenuHeader/>}>
        <Route path="/" element={<Home/>}/>
        <Route path="products" element={<Products/>}></Route>
        <Route path="profile" element={<Profile/>}></Route>
        <Route path="product/:id" element={<DetailProduct/>}></Route>
        <Route path="search" element={<Search/>}></Route>
      </Route>
    </Routes>
    </>
  )
}