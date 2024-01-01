import { apiRemoveCart } from 'apis'
import Button from 'components/buttons/Button'
import withBaseComponent from 'hocs/withBaseComponent'
import React, { memo } from 'react'
import { AiFillCloseCircle } from 'react-icons/ai'
import { ImBin } from 'react-icons/im'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { showCart } from 'store/app/appSlice'
import { getCurrent } from 'store/user/asyncActions'
import { formatMoney } from 'ultils/helpers'
import path from 'ultils/path'


const Cart = ({ dispatch, navigate }) => {
  const { current } = useSelector(state => state.user)
  const removeCart = async (pid) => {
    const response = await apiRemoveCart(pid)
    if (response.success) {
      dispatch(getCurrent())
    }
    else toast.error(response.mes)
  }
  return (
    <div onClick={e => e.stopPropagation()} className='w-[400px] h-screen bg-black grid grid-rows-10 text-white p-6'>
      <header className='border-b border-gray-500 flex justify-between items-center row-span-1 h-full font-bold text-2xl'>
        <span>Your Cart</span>
        <span onClick={() => dispatch(showCart())} className='p-2 cursor-pointer'><AiFillCloseCircle size={24} /></span>
      </header>
      <section className='row-span-7 flex flex-col gap-3 h-full max-h-full overflow-y-auto py-3'>
        {!current?.cart && <span className='text-xs italic'>Your cart is empty.</span>}
        {current?.cart && current?.cart?.map(el => (
          <div key={el._id} className='flex justify-between items-center'>
            <div className='flex gap-2'>
              <img src={el.product?.thumb} alt="thumb" className='w-16 h-16 object-cover' />
              <div className='flex flex-col gap-1'>
                <span className='text-sm text-main'>{el.product?.title}</span>
                <span className='text-[10px]'>{el.color}</span>
                <span className='text-sm'>{formatMoney(el.product?.price) + ' vnd'}</span>
              </div>
            </div>
            <span onClick={() => removeCart(el.product?._id)} className='h-8 w-8 rounded-full flex items-center justify-center hover:bg-gray-700 cursor-pointer'><ImBin size={16} /></span>
          </div>
        ))}
      </section>
      <div className='row-span-2 flex flex-col justify-between h-full'>
        <div className='flex items-center justify-between pt-4 border-t'>
          <span>Subtotal:</span>
          <span>{formatMoney(current?.cart?.reduce((sum, el) => sum + Number(el.product?.price), 0)) + ' vnd'}</span>
        </div>
        <span className='text-center text-gray-700 italic text-xs'>Shipping...</span>
        <Button handleOnClick={() => {
          dispatch(showCart())
          navigate(`/${path.DETAIL_CART}`)
        }} style='rounded-none w-full bg-main py-3'>Shopping Cart</Button>
      </div>
    </div>
  )
}

export default withBaseComponent(memo(Cart))