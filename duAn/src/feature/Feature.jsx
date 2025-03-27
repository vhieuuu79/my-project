import React from 'react'
import BoxFeature from './BoxFeature'
const feature = [
    {
        src:'https://media.istockphoto.com/id/1186665850/vi/vec-to/xe-t%E1%BA%A3i-giao-h%C3%A0ng-v%E1%BA%ADn-chuy%E1%BB%83n-nhanh-thi%E1%BA%BFt-k%E1%BA%BF-bi%E1%BB%83u-t%C6%B0%E1%BB%A3ng-%C4%91%C6%B0%E1%BB%9Dng-minh-h%E1%BB%8Da-vector-cho-c%C3%A1c-%E1%BB%A9ng-d%E1%BB%A5ng.jpg?s=612x612&w=0&k=20&c=DQ_gRIc2TOB1p6jFH_7LjPqb6Ecbz1UfNWUoUT6aju4=',
        title:'Free Delovery',
        des:'Orders from all items',
    },
    {
        src:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSW3sEPwHvFrulDaHrVEOcwgVj8BF8IbeJ2Fw&s',
        title:'Return & Refund',
        des:'Money back guarantee',
    },
    {
        src:'https://static.vecteezy.com/system/resources/thumbnails/000/550/535/small/user_icon_007.jpg',
        title:'Member Discount',
        des:'On order over $99',
    },
    {
        src:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR13HUAnJxZA_NhkLvR_U0Ce2SuRjAXdfQ7RA&s',
        title:'Support 24/7',
        des:'Contact us 24 hours a day',
    }
]
const Feature = () => {
  return (
    <>
    <div className='flex justify-evenly py-5'>
    {
        feature.map((item,index)=> 
            <BoxFeature item={item} key={index}/>
        )
    }
    </div>
    </>
  )
}

export default Feature