import React, { createContext, useState } from 'react'

export const loadingContext=createContext()

const LoadingContextProvider = ({children}) => {
    const [loading , setLoading]=useState(false)

    const showLoader=()=>{
        setLoading(true)
    }
    const hideLoader=()=>{
        setLoading(false)
    }
  return (
    <loadingContext.Provider value={{loading , showLoader , hideLoader}}>
      {children}
    </loadingContext.Provider>
  )
}

export default LoadingContextProvider
