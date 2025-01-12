 import React from 'react'
import img1 from '../../assets/images/bg5.jpg' 
const CarCard = () => {
  return (
    <div className='flex flex-col items-center justify-center rounded-2xl bg-[var(--bs-card-bg)] py-10 p-4 gap-7'>
      <img src={img1} alt="" className='w-36 h-36 rounded-full'/>
      <h3 className='text-[var(--bs-white)] font-sans font-bold hover:text-[var(--bs-text)]'>Sedan</h3>
    </div>
  )
}

export default CarCard
