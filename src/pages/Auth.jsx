import React, { useContext, useState } from 'react'
import authImg from '../assets/imgLogin.png'
import { FloatingLabel,Form } from 'react-bootstrap'
import {  Link, useNavigate } from 'react-router-dom'
import { loginAPI, registerAPI } from '../services/allAPI'
import {Spinner} from 'react-bootstrap'
import { tokenAuthContext } from '../contexts/AuthContextAPI'


const Auth = ({insideRegister}) => {
  const {isAuthorised,setIsAuthorized}=useContext(tokenAuthContext)
  const [isLogined,setisLogined]=useState(false)
  const navigate=useNavigate()
  const[inputData,setInputData]=useState({Username:'',Password:'',Email:''})
  console.log(inputData);
  const handleRegister=async(e)=>
  {
    e.preventDefault()
    console.log("Inside handleRegsiter");
    if(inputData.Username&&inputData.Password&&inputData.Email)
    {
      //alert("Make Api call")
      try{
          const result=await registerAPI(inputData)
          console.log(result);
          if(result.status==200)
          {
            alert(`welcome ${result.data?.Username},please login to explore our website`)
            navigate('/login')
            setInputData({Username:'',Password:'',Email:''})
          }
          else{
            if(result.response.status==406)
            {
              alert(result.response.data),
              setInputData({Username:'',Password:'',Email:''})
            }
          }
      }
      catch(err){
          console.log(err);
          
      }
    }
    else{
      alert("Please fill the form completely")
    }
    
  }
  const handleLogin=async(e)=>{
    e.preventDefault()
    if(inputData.Email && inputData.Password)
    {
        try{
            const result= await loginAPI(inputData)
            if(result.status==200)
            {
              sessionStorage.setItem("user",JSON.stringify(result.data.user))
              sessionStorage.setItem("token",result.data.token)
              setIsAuthorized(true)
              setisLogined(true)
              setTimeout(()=>{
                setInputData({Username:"",Email:"",Password:""})
                navigate('/')
                setisLogined(false)
              },2000)
            }
            else
            {
                if(result.response.status==404)
                {
                  alert(result.response.data)
                }
            }
        }
        catch(err)
        {
          console.log(err);
        }
    }
    else
    {
      alert("Please fill the Form!!!")
    }
  }
  
  return (
    <div style={{minHeight:'100vh',width:'100%'}} className='d-flex justify-content-center align-items-center'>
      <div className="container w-75">
        <div className="shadow card p-2">
          <div className="row align-items-center">
            <div className="col-lg-6">
                    <img className='img-fluid' src={authImg} alt="" />
            </div>
            <div className="col-lg-6">
          <div className="mt-2"><i className='fa-brands fa-docker'></i>Project Fair</div>
          <h5 className='mt-2'> Sign {insideRegister?"Up":"In"} to your Account</h5>
          <Form>
            {
              insideRegister&&<FloatingLabel
              controlId="floatingInputName"
              label="Username"
              className="mb-3"
            >
              <Form.Control type="text" placeholder="Username" onChange={e=>setInputData({...inputData,Username:e.target.value})} />
            </FloatingLabel>
            }
          <FloatingLabel
        controlId="floatingInput"
        label="Email address"
        className="mb-3"
      >
        <Form.Control type="email" placeholder="name@example.com" onChange={e=>setInputData({...inputData,Email:e.target.value})} />
               </FloatingLabel>
              <FloatingLabel controlId="floatingPassword" label="Password">
        <Form.Control type="password" placeholder="Password" onChange={e=>setInputData({...inputData,Password:e.target.value})} />
              </FloatingLabel>
              {
                insideRegister ?
                <div className="mt-3">
                  <button onClick={handleRegister} className='btn btn-primary mb-2'>Register</button>
                  <p>Already a user?Please click here to <Link to = {'/login'}>Login</Link></p>
                </div>
                :
                <div className="mt-3">
                  <button onClick={handleLogin} className='btn btn-primary  mb-2'>Login
                  {isLogined&&<Spinner animation="border" variant="danger" />}
                  </button>
                  <p>Already a user?Please click here to <Link to ={'/register'}>Register</Link></p>
                </div>


              }
          </Form>
            </div>
          </div>
        </div>
      </div>


    </div>
  )
}

export default Auth