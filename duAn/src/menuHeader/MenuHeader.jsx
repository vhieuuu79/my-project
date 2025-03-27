import React, { useEffect, useRef, useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { NavLink, Outlet } from 'react-router-dom';
import logo from '/src/assets/Hugo.png';
import { InputBase, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import StyledBadge  from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Login from '../login/Login';
import { useDispatch, useSelector} from 'react-redux';
import { updateOpenLogin } from '../redux/authenSlice/AuthenSlice';
import CloseIcon from '@mui/icons-material/Close';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { pink } from '@mui/material/colors';
import { addToCart, cartSlice, reduceCart, removeCart, searchListProduct, setCartState } from '../redux/cartSlice/CartSlice';
import MenuAccount from '../menuAccount/MenuAccount';
import Search from '../search/Search';
import serviceApi from '../api/GetApi';

const drawerWidth = 300;
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: open ? 0 : -drawerWidth,
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  backgroundColor: 'white', // Xóa màu xanh
  color: 'black', // Đổi màu chữ nếu cần
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  width: open ? `calc(100% - ${drawerWidth}px)` : '100%',
  marginRight: open ? drawerWidth : 0,
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start',
}));

const MenuHeader = () => {
  const distpatch = useDispatch();
  const inputRef = useRef(null);
  const theme = useTheme();
 const cartState = useSelector((state)=> state.cartSlice.cartState);
 const [nameProduct, setNameProduct] = useState('');

 const loadData = async () => {
  if (nameProduct.trim() !== '') { 
    const res = await serviceApi.searchProduct(nameProduct);
    distpatch(searchListProduct(res));
  }
  };
  const handleSearch = () => {
    if (inputRef.current) {
      setNameProduct(inputRef.current.value); 
    }
  };

  useEffect(() => {
    loadData();
  }, [nameProduct]); 

  const handleDrawerOpen = () => {
    if(isLogin){
      distpatch(setCartState(true))
    }
    else{
      distpatch(updateOpenLogin(true));
    }
  };

  const handleDrawerClose = () => {
    distpatch(setCartState(false))
  };
  const {isLogin,userName} = useSelector(state => state.authenSlice)
  const {listCart} = useSelector(state=> state.cartSlice)
  const formatBigNumber = (num,hasCurrencySymbol) => {
    return (
      new Intl.NumberFormat('de-DE').format(num).toString() +
      (hasCurrencySymbol ? '₫' : '')
    )
  }  
  const totalProduct = (listCart || []).reduce(
    (sum, item) => sum + item.price * item.quatity,
    0
);
  
  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="fixed" open={cartState}>
          <Toolbar>
            <Typography className='header' variant="h6" noWrap sx={{ flexGrow: 1 }} component="div">
              <div className={'search'}>
              <NavLink to='/'>
                <img src={logo} className='h-20' alt='logoStore'/>
              </NavLink>
              <NavLink to="search">
              <Paper
                    component="form"
                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
                    >
                    <IconButton sx={{ p: '10px' }} aria-label="menu">
                    </IconButton>
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Search for a product..."
                        inputProps={{ 'aria-label': 'search' }}
                        inputRef={inputRef}
                    />
                    <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={handleSearch}> 
                        <SearchIcon />
                    </IconButton>
                    </Paper>
              </NavLink>
              </div>
              <NavLink to="products">
                <b className='text-xl'>Products</b>
              </NavLink>
            </Typography>
            {(isLogin && userName)?  
            <MenuAccount/>
              :<Login/>}
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerOpen}
              sx={{ display: cartState ? 'none' : 'block' }}
            >
              <StyledBadge badgeContent={(listCart?.length ?? 0)} color="secondary">
                    <ShoppingCartIcon />
                </StyledBadge>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Main className='!p-0' open={cartState}>
          <DrawerHeader />
          <Outlet/>
        </Main>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
            },
          }}
          variant="persistent"
          anchor="right"
          open={cartState}
        >
          <DrawerHeader className='flex !justify-around'>
            <div>
              <b>Your Cart</b>
            </div>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? <CloseIcon /> : <CloseIcon />}
            </IconButton>
          </DrawerHeader>
          {listCart && listCart.length === 0?
          <div>
          <img src='https://web.nvnstatic.net/tp/T0199/img/empty_cart.png?v=8'/>
        </div> 
        : 
        <div className='flex flex-col'>
          {listCart && listCart.map((item,index)=> 
          <div>
            <div key={index} className='flex border m-2 gap-1'>
              <img className='w-20' src={item.thumbnail}/>
              <div>
                <div>{item.title}</div>
                <div>{formatBigNumber(item.price,true)}</div>
                <div className='flex items-center'>
                  <RemoveCircleOutlineIcon onClick={()=> distpatch(reduceCart(item))} sx={{ fontSize: 18 }}/>
                <div>{item.quatity}</div>
                <AddCircleOutlineIcon onClick={()=> distpatch(addToCart(item))} sx={{ fontSize: 18 }}/>
                </div>
                
              </div>
              <div className='flex flex-col flex-1 justify-center items-center'>
                <b>{(item.price * item.quatity).toFixed(2) }</b>
                <DeleteForeverIcon onClick={()=> distpatch(removeCart(item.id))} sx={{ color: pink[500] }}/>
              </div>
            </div>
            <b className='m-2'>Total: {totalProduct}</b>
            </div>
          )}
        </div>
          }
        </Drawer>
      </Box>
    </>
  );
};

export default MenuHeader;