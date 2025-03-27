import { Button, Divider, Rating, Stack } from '@mui/material'
import React from 'react'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateOpenLogin } from '../../redux/authenSlice/AuthenSlice';
import { addToCart, cartSlice } from '../../redux/cartSlice/CartSlice';

const BoxHome = ({item}) => {
  const formatBigNumber = (num,hasCurrencySymbol) => {
    return (
      new Intl.NumberFormat('de-DE').format(num).toString() +
      (hasCurrencySymbol ? '₫' : '')
    )
  }
  // cách dùng formatBigNumber(1000,true) => 1.000đ
  const dispatch = useDispatch();
  const {isLogin} = useSelector(state => state.authenSlice)
  const handleClick = () => {
    if(isLogin){
      dispatch(addToCart({
        ...item,
        quatity:1,
      }))
    }
    else {
      dispatch(updateOpenLogin(true))
    }
    
  }
  return (
    <>
      <div to={item.id+''}
      key={item.id} className='w-48 ml-2 flex justify-between flex-col border p-1 rounded-lg cursor-pointer gap-1'>
        <NavLink to={`/product/${item.id}`}>
        <img className='object-cover mb-1' src={item.thumbnail}/>
         <Divider/>
         <div>Name: {item.title}</div>
         <div>Price: {formatBigNumber(item.price,true)}</div>
         <div>Category: {item.category}</div>
         <Rating defaultValue={item.rating} precision={0.5} />
        </NavLink>
        <Button onClick={handleClick} variant="outlined" startIcon={<ShoppingCartIcon/>}>
            ADD TO CART
          </Button>
         <Stack className='iconAdd' direction="row" spacing={2}>
        </Stack>
       </div>
       
    </>
  )
}

export default BoxHome;