import React, { createContext,useState } from 'react'
export const addProjectResponseContext=createContext()
export const editProjectResponseContext=createContext()

const ContextAPI = ({children}) => {
    const[addProjectResponse,setAddProjectResponse]=useState("")
    const[editProjectResponse,setEditProjectResponse]=useState("")
  return (
   <editProjectResponseContext.Provider value={{editProjectResponse,setEditProjectResponse}}>
     <addProjectResponseContext.Provider value={{addProjectResponse,setAddProjectResponse}}>
        {children}
    </addProjectResponseContext.Provider>
   </editProjectResponseContext.Provider>
  )
}

export default ContextAPI
