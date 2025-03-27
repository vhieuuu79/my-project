import React, { useEffect, useState } from 'react';
import serviceApi from '../api/GetApi';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import BoxHome from './../menuHeader/boxHome/BoxHome';
import { Backdrop, CircularProgress, Divider } from '@mui/material';
import SortProduct from './SortProduct';

const Products = () => {
  const [url, setUrl] = useState('');
  const [listCategory, setListCategory] = useState([]);
  const [listProduct, setListProduct] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(''); 
  const [sort,setSort] = useState({
    ischeck:false,
    listProduct:[]
  })
  const [open, setOpen] = React.useState(false);

  const dataListCategory = async () => {
    setOpen(true);
    const res = await serviceApi.getListCategory();
    setListCategory(res);
    const defaultCategory = res.find(item => item.name.toLowerCase() === 'beauty');
    if (defaultCategory) {
      setUrl(defaultCategory.url);
      setSelectedCategory(defaultCategory.name)
      setOpen(false);

    }
  };
  useEffect(()=> {
    dataListCategory();
  },[])
  const dataListProduct = async () => {
    setOpen(true);
    if (url) {
      const tmp = await serviceApi.getProduct(url);
      setListProduct(tmp.products);
      setOpen(false);
    }
  };
  useEffect(() => {
    if(url){
        dataListProduct();
    }
  }, [url]);
    
  return (
    <div className="w-11/12 m-auto mt-10">
      <div className='text-gray-500'>
        <b>DANH MỤC</b>
      </div>
      <Divider/>
      <div className="flex gap-2 flex-wrap mt-2 mb-2 ">
        {listCategory.map((item, index) => (
          <Stack className={selectedCategory === item.name? 'bg-green-300': ''} key={index} spacing={2} direction="row">
            <Button onClick={() => {setUrl(item.url); 
                                    setSelectedCategory(item.name);    
                                    setSort({ ischeck: false, listProduct: [] });
}} variant="outlined">{item.name}</Button>
          </Stack>
        ))}
      </div>
      <Divider/>
      <SortProduct listProduct={listProduct} onChooseData = {(data)=> setSort({
        ...sort,
        ischeck:true,
        listProduct:data
      })}/>
      <div className='flex flex-wrap gap-4 pt-2 mt-2'>
        {sort.ischeck ? 
        sort.listProduct.map(item=> 
          <BoxHome item={item} key={item.id}/>
        )  : 
        listProduct.map(item=> 
          <BoxHome item={item} key={item.id}/>
        )} 
      </div>
      <Backdrop
        sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>  
    </div>
  );
};

export default Products;
