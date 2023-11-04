import React, { useState, useEffect } from 'react'
import { apiGetProducts } from '../apis/product'
import Product from './Product'
import Slider from "react-slick";

const tabs = [
  { id: 1, name: 'best sellers' },
  { id: 2, name: 'new arrivals' },
  // { id: 3, name: 'tablets' },
]

var settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1
};

const BestSeller = () => {
  const [bestSellers, setBestSellers] = useState(null)
  const [newProducts, setNewProducts] = useState(null)
  const [activedTab, setActivedTab] = useState(1)
  const [products, setProducts] = useState(null)

  const fetchProducts = async () => {
    const response = await Promise.all([apiGetProducts({ sort: '-order' }), apiGetProducts({ sort: '-createdAt' })])
    if (response[0]?.success) {
      setBestSellers(response[0].products)
      setProducts(response[0].products)
    }
    if (response[1]?.success) setNewProducts(response[1].products)
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  useEffect(() => {
    if (activedTab === 1) setProducts(bestSellers)
    if (activedTab === 2) setProducts(newProducts)

  }, [activedTab])

  return (
    <div>
      <div className='flex text-[20px] ml-[-32px]'>
        {tabs.map(el => (
          <span
            key={el.id}
            className={`cursor-pointer font-semibold capitalize px-8 border-r text-gray-400 ${activedTab === el.id ? 'text-gray-900' : ''}`}
            onClick={() => setActivedTab(el.id)}
          >{el.name}</span>
        ))}
      </div>
      <div className='mt-4 mx-[-10px] border-t-2 border-main pt-4'>
        <Slider {...settings}>
          {products?.map(el => (
            <Product
              key={el._id}
              pid={el._id}
              productData={el}
              isNew={activedTab === 1 ? false : true}
            />
          ))}
        </Slider>
      </div>
      <div className='w-full flex gap-4 mt-4'>
        <img className='flex-1 object-contain' src="https://digital-world-2.myshopify.com/cdn/shop/files/banner2-home2_2000x_crop_center.png?v=1613166657" alt="banner" />
        <img className='flex-1 object-contain' src="https://digital-world-2.myshopify.com/cdn/shop/files/banner1-home2_2000x_crop_center.png?v=1613166657" alt="banner" />
      </div>
    </div>
  )
}

export default BestSeller