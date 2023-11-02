import React from 'react'
import logo from '../assets/logo.png'
import icons from '../ultils/icons'
import { Link } from "react-router-dom"
import path from '../ultils/path'

const { RiPhoneFill, MdEmail, BsHandbagFill, FaUserCircle } = icons
const Header = () => {
  return (
    <div className='w-main flex justify-between h-[110px] py-[35px]'>
      <Link to={`/${path.HOME}`}>
        <img src={logo} alt="logo" className='w-[234px] object-contain' />
      </Link>
      <div className='flex text-[13px] '>
        <div className='flex flex-col px-6 border-r items-center'>
          <span className='flex gap-4 items-center'>
            <RiPhoneFill color='red' />
            <span className='font-semibold'>0967816629</span>
          </span>
          <span>Mon-D</span>
        </div>
        <div className='flex flex-col px-6 border-r items-center'>
          <span className='flex gap-4 items-center'>
            <MdEmail color='red' />
            <span className='font-semibold'>Email</span>
          </span>
          <span>Online</span>
        </div>
        <div className='flex items-center justify-center gap-2 px-6 border-r'>
          <BsHandbagFill />
          <span>0 item(s)</span>
        </div>
        <div className='flex items-center justify-center px-6'>
          <FaUserCircle size={24} />
        </div>
      </div>
    </div>
  )
}

export default Header