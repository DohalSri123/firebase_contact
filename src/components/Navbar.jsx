import React from 'react'

const Navbar = () => {
  return (
    <div className='my-4 bg-slate-600 h-[60px] rounded-lg flex items-center justify-center gap-4 text-xl font-medium'>
      
        <img className= ' h-12  w-12'src='./contact-icon.svg' />
        <h1 className=' text-white'>Contact App</h1>
    </div>
  )
}

export default Navbar