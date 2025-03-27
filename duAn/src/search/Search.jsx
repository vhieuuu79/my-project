import React from 'react'
import { useSelector } from 'react-redux'
import BoxHome from '../menuHeader/boxHome/BoxHome';

const Search = () => {
    const {searchProduct} = useSelector(state=> state.cartSlice)
  return (
    <>
      <div className='mt-10 w-11/12 m-auto'> 
            <div className='flex flex-wrap gap-4 pt-2'>
            {searchProduct.length  === 0 ? 
            <div className='flex flex-col justify-center items-center w-full mt-28'>
                <img src='https://web.nvnstatic.net/tp/T0199/img/empty_cart.png?v=8'/>
                <div>Không tìm thấy sản phẩm bạn mong muốn!</div>
            </div>
            :
            searchProduct.map(item =>
              <BoxHome item={item} key={item.id} />
            )}
          </div>
      </div>
    </>
  )
}

export default Search