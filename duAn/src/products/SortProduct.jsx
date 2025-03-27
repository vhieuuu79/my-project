import React from 'react'
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
const SortProduct = (props) => {    
    const {listProduct,onChooseData} = props;
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    const handleSortRating = ()=> {
        setAnchorEl(null);
        const newListProduct = listProduct.sort((a,b)=> {
            if( a.rating-b.rating>0) return -1;
            else return 1;
        }
        )
        onChooseData(newListProduct);
    }
    const handleSortPrice = () => {
        setAnchorEl(null);
        const newListProduct = listProduct.sort((a,b)=> {
            if( a.price-b.price>0) return -1;
            else return 1;
        }
        )
        onChooseData(newListProduct);
    }
  return (
    <div>
    <Button
      id="demo-positioned-button"
      aria-controls={open ? 'demo-positioned-menu' : undefined}
      aria-haspopup="true"
      aria-expanded={open ? 'true' : undefined}
      onClick={handleClick}
    >
      <SwapVertIcon/>
    </Button>
    <Menu
      className='!left-20'
      id="demo-positioned-menu"
      aria-labelledby="demo-positioned-button"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
    >
      <MenuItem className='!text-gray-500' onClick={handleSortRating}>Rating sort</MenuItem>
      <MenuItem className='!text-gray-500' onClick={handleSortPrice}>Price sort</MenuItem>
    </Menu>
  </div>
  )
}

export default SortProduct