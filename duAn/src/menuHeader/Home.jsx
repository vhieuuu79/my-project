import React from 'react'
import {useSelector } from 'react-redux'
import BoxHome from './boxHome/BoxHome';
import ads from '/src/assets/ads.png'
import ads2 from '/src/assets/ads2.png'
import Feature from '../feature/Feature';

const Home = () => {
  const trendingProducts = useSelector(state => state.productSlice.products);    
  return (
    <>
      <div>
        <img src={ads} className='pt-1' />
        <div className='w-11/12 m-auto pt-2'>
        <Feature/>
          <b className='text-4xl'>Trending Products</b>
          <div className='flex flex-wrap gap-4 pt-2'>
            {(trendingProducts ?? []).slice(0,7).map(item =>
              <BoxHome item={item} key={item.id} />
            )}
          </div>

          <img src={ads2} className="pt-4" />
          <b className='text-4xl'>New Arrivals</b>
          <div className='flex flex-wrap gap-4 pt-2'>
            {(trendingProducts ?? []).slice(10,17).map(item =>
              <BoxHome item={item} key={item.id} />
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Home