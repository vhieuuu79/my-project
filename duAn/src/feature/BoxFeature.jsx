import React from 'react'

const BoxFeature = ({item}) => {    
  return (
    <>
    <div className='bg-gray-300 flex w-72 gap-2 h-14'>
        <img className='h-14' src={item.src}/>
    <div>
        <b>{item.title}</b>
        <div>{item.des}</div>
    </div>
    </div>
    </>
  )
}

export default BoxFeature