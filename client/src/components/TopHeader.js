import React, { memo, useEffect } from 'react'
import { Link } from 'react-router-dom'
import path from '../ultils/path'
import { getCurrent } from '../store/user/asyncActions'
import { useDispatch, useSelector } from 'react-redux'
import icons from '../ultils/icons'
import { logout } from '../store/user/userSlice'


const { AiOutlineLogout } = icons

const TopHeader = () => {
  const dispatch = useDispatch()
  const { isLoggedIn, current } = useSelector(state => state.user)

  useEffect(() => {
    if (isLoggedIn) dispatch(getCurrent())
  }, [dispatch, isLoggedIn])


  return (
    <div className='h-[38px] w-full bg-main flex items-center justify-center'>
      <div className='w-main flex items-center justify-between text-xs text-white'>
        <span>Order online (0967816629)</span>
        {isLoggedIn
          ? <div className='flex gap-4 text-sm items-center'>
            <span>{`Welcome, ${current?.lastname} ${current?.firstname}`}</span>
            <span
              onClick={() => dispatch(logout())}
              className='hover:rounded-full bg-gray-200 hover:text-main cursor-pointer p-2'>
              <AiOutlineLogout size={18} />
            </span>
          </div>
          : <Link className='hover:text-gray-800' to={`/${path.LOGIN}`}>Sign In</Link>}
      </div>
    </div>
  )
}

export default memo(TopHeader)