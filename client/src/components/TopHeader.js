import React, { memo } from 'react'
import { Link } from 'react-router-dom'
import path from '../ultils/path'

const TopHeader = () => {
  return (
    <div className='h-[38px] w-full bg-main flex items-center justify-center'>
      <div className='w-main flex items-center justify-between text-xs text-white'>
        <span>Order online (0967816629)</span>
        <Link to={`/${path.LOGIN}`}>Sign In</Link>
      </div>
    </div>
  )
}

export default memo(TopHeader)