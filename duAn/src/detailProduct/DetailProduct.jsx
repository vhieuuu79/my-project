import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import serviceApi from '../api/GetApi';
import {Button, Rating, Stack} from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, setCartState } from '../redux/cartSlice/CartSlice';
import BoxHome from '../menuHeader/boxHome/BoxHome';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { updateOpenLogin } from '../redux/authenSlice/AuthenSlice';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';

const DetailProduct = () => {
    const param = useParams();    
    const dispatch = useDispatch();
    const {isLogin} = useSelector(state => state.authenSlice)
    const [loading, setLoading] = React.useState(false);
    const [selectedImg,setSelectedImg] = useState('')
    const [open, setOpen] = React.useState(false);

    const [detailProduct,setDetailProduct] = useState({
        thumbnail:'',
        discountPercentage:0,
        reviews:[],
        images:[],
        title:'',
        rating:0,
        stock:0,
        price:0,
        description:'',
        category:'',
        brand:'',
      })

    const loadDataDetail = async()=> {
        setLoading(true)
        const res = await serviceApi.getDetailProduct(param.id);        
        const {discountPercentage,thumbnail,reviews,images,title,rating,stock,price,description,category,brand} = res;
        setDetailProduct({
        ...detailProduct,
        discountPercentage,
        thumbnail,
        reviews,
        images,
        title,
        rating,
        stock,
        price,
        description,
        category,
        brand,
        });
        setLoading(false)

        }        

    const formatBigNumber = (num,hasCurrencySymbol) => {
            return (
              new Intl.NumberFormat('de-DE').format(num).toString() +
              (hasCurrencySymbol ? '₫' : '')
            )
          }
          // cách dùng formatBigNumber(1000,true) => 1.000đ

    const handleClick = () => {
        if(isLogin){
          dispatch(addToCart({
            ...detailProduct,
            quatity:1,
          }))
        }
        else {
          dispatch(updateOpenLogin(true))
        }
    }  
    
    const handleBuyNow = ()=> {
        if(isLogin){
            dispatch(setCartState(true))
            dispatch(addToCart({
              ...detailProduct,
              quatity:1,
            }))
          }
          else {
            dispatch(updateOpenLogin(true))
          }
    }

    useEffect(()=> {
        loadDataDetail();
    },[param.id])
    const [listCategory,setListCategory] = useState([])
   const loadDataCategory = async ()=> {
        if(detailProduct?.category){
            const res = await serviceApi.getCategory(detailProduct.category)
            setListCategory(res.products)
            
        }
    }
    useEffect(() => {
        if (detailProduct.category) {
            loadDataCategory();
        }
    }, [detailProduct.category]);

  return (
    <>
        <div className='flex gap-4 mt-10 justify-around'>
            <div  className='flex-1 flex flex-col'>
            <div>
                {selectedImg && selectedImg.trim() !== "" ? (
                    <img src={selectedImg} className="w-full h-96" />
                ) : detailProduct.thumbnail && detailProduct.thumbnail.trim() !== "" ? (
                    <img src={detailProduct.thumbnail} className="w-full h-96" />
                ) : null}

                <div className="h-20 flex gap-2">
                    {detailProduct.images.length > 0 &&
                        detailProduct.images.map((item, index) =>
                            item && item.trim() !== "" ? (
                                <img
                                    key={index}
                                    className="h-full cursor-pointer"
                                    src={item}
                                    onClick={() => setSelectedImg(item)}
                                />
                            ) : null
                        )}
                </div>
            </div>

            </div>
            <div  className='flex-1'>
                <div className='flex flex-col pt-7 gap-3'>
                <div className='text-4xl'>{detailProduct.title}</div>
                <div>
                <Rating value={detailProduct.rating} precision={0.5} />

                </div>
                <span>{formatBigNumber(detailProduct.price,true)}</span>
                <div className='flex gap-11'>
                <b>Brand</b>
                <span>{detailProduct.brand}</span>
                </div>
                <div className='flex gap-4'>
                <b>Catogory</b>
                <span>{detailProduct.category}</span>
                </div>
                <div className='flex gap-12'>
                <b>Stock</b>
                <span>{detailProduct.stock}</span>
                </div>
                <b>About the product</b>
                <div>{detailProduct.description}</div>
                <div className='flex gap-2'>
                    <Button onClick={handleClick} variant='outlined' startIcon={<ShoppingCartIcon/>}>
                    ADD TO CART
                    </Button>
                    <Stack spacing={2} direction="row">
                    <Button onClick={handleBuyNow} variant="contained" startIcon={<VolunteerActivismIcon/>} >Buy now</Button>
                    </Stack>
                </div>
                </div>
            </div>
            <div key={param.id}  className='flex-1 pt-7 pl-7 flex flex-col gap-4'>
                <b className='text-4xl'>Reviews</b>
                {detailProduct.reviews.map((item,index)=>
                <div key={item.id ?? index}>
                    <b>{item.reviewerName}</b>
                    <div><Rating value= {item.rating} precision={0.5} />
                   </div>
                    <div>{item.comment}</div>

                </div>
                )}
            </div>
        </div>
        <hr className='mt-4'/>
        <div className='flex flex-col gap-2'>
        <div className='mt-4'>
        <b className='text-4xl'>Similar Products</b>
        </div>
        <div className='flex gap-10'>
        {listCategory.map(item=> 
            <BoxHome item={item} key={item.id}/>
        )}
        </div>
        </div>
        <Backdrop
            sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
            open={loading}
        >
            <CircularProgress color='inherit' />
        </Backdrop>
  </>
  )
}

export default DetailProduct