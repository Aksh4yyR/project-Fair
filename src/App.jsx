
import './App.css'
import Home from './pages/Home'
import Projects from './pages/Projects'
import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard'
import { Route, Routes } from 'react-router-dom'
import Footer from './components/Footer'
import View from './components/View'
import { useContext } from 'react'
import { tokenAuthContext } from './contexts/AuthContextAPI'

import { Navigate } from 'react-router-dom'

function App() {
 const {isAuthorised,setIsAuthorized}=useContext(tokenAuthContext)

  return (
    <>
<Routes>
  <Route path='/' element={<Home/>}></Route>
  <Route path='/Dashboard' element={isAuthorised? <Dashboard/>: <Navigate to ={'/login'}/>}></Route>
  <Route path='/Projects' element={ isAuthorised? <Projects/> :<Navigate to ={'/login'}/>}></Route>
  <Route path='/Login' element={<Auth/>}></Route>
  <Route path='/Register' element={<Auth insideRegister={true}/>}></Route>
  <Route path='/View' element={<View/>}></Route>

  </Routes>  
  <Footer/>
    </>
  )
}

export default App
