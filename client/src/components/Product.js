import React, { useState } from 'react'
import { formatMoney, renderStarFromNumber } from '../ultils/helpers'
import trending from '../assets/trending.png'
import label from '../assets/new.png'
import SelectOption from './SelectOption'
import icons from '../ultils/icons'
import { Link } from "react-router-dom";
import path from '../ultils/path'

const { AiFillEye, AiOutlineMenu, BsFillSuitHeartFill } = icons

const Product = ({ productData, isNew, normal }) => {
  const [iShowOption, setIShowOption] = useState(false)
  return (
    <div className='w-full text-base px-[10px]'>
      <Link
        onMouseEnter={e => {
          e.stopPropagation()
          setIShowOption(true)
        }}
        onMouseLeave={e => {
          e.stopPropagation()
          setIShowOption(false)
        }}
        className='w-full border p-[15px] flex flex-col items-center'
        to={`/${productData?.category?.toLowerCase()}/${productData?._id}/${productData.title}`}
      >
        <div className='w-full relative'>
          {iShowOption && <div className='absolute bottom-[-10px] flex left-0 right-0 justify-center gap-2 animate-slide-top'>
            <SelectOption icons={<AiFillEye />} />
            <SelectOption icons={<AiOutlineMenu />} />
            <SelectOption icons={<BsFillSuitHeartFill />} />
          </div>}
          <img
            src={productData?.thumb || 'https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png'}
            alt=""
            className='w-[274px] h-[274px] object-cover'
          />
          {!normal && <img src={isNew ? label : trending} alt="" className={`absolute w-[100px] h-[35px] top-0 right-0 object-cover`} />}
        </div>
        <div className='flex flex-col gap-1 mt-[15px] items-start w-full'>
          <span className='flex h-4'>{renderStarFromNumber(productData?.totalRatings)?.map((el, index) => (
            <span key={index}>{el}</span>
          ))}</span>
          <span className='line-clamp-1'>{productData?.title}</span>
          <span>{`${formatMoney(productData?.price)} VND`}</span>
        </div>
      </Link>
    </div>
  )
}

export default Product