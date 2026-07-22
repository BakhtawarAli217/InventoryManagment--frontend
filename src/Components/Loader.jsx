import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const Loader = () => {

  const location=useLocation()

  useEffect(()=>{
    window.scrollTo(0 , 0)
  },[location.pathname])

  return (
    <div className='w-full fixed top-0 left-0 h-dvh flex justify-center items-center bg-white z-50'>
        <div className="loader">

        </div>
    </div>
  )
}

export default Loader
