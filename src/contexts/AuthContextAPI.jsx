import React, { useEffect, useState } from 'react'
import { createContext } from 'react'
export const tokenAuthContext=createContext()
const AuthContextAPI = ({children}) => {
    const[isAuthorised,setIsAuthorized]=useState(false)

    useEffect(()=>
    {
        if(sessionStorage.getItem("token"))
        {
            setIsAuthorized(true)
        }
        else{
            setIsAuthorized(false)
        }
    },[isAuthorised])
  return (
    <tokenAuthContext.Provider value={{isAuthorised,setIsAuthorized}}>
        {children}
    </tokenAuthContext.Provider>
  )
}

export default AuthContextAPI