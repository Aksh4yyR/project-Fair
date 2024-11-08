import React, { useEffect, useState } from 'react'
import {Collapse} from 'react-bootstrap';
import proImg from '../assets/proImg.png'
import SERVER_URL from '../services/serverUrl'
import { updateUserAPI } from '../services/allAPI';
const Profile = () => {
  const [preview,setPreview]=useState("")
  const [existingProfileImg,setExistingProfileImg]=useState("")
  const [userDetails,setUserDetails]=useState({Email:"",Password:"",Username:"",github:"",linkedin:"",profilePic:""})
  const [open,setOpen]=useState(false)

  useEffect(()=>{
    if(sessionStorage.getItem("user"))
    {
      const user=JSON.parse(sessionStorage.getItem("user"))
      setUserDetails({
        ...userDetails,Email:user.Email,Password:user.Password,Username:user.Username,github:user.github,linkedin:user.linkedin
      })
      setExistingProfileImg(user.profilePic)
    }
  },[open])

useEffect(()=>{
  if(userDetails.profilePic)
  {
    setPreview(URL.createObjectURL(userDetails.profilePic))
  }
  else{
    setPreview("")
  }
},[userDetails.profilePic])

const handleUpdateProfile=async()=>
{
  const {Username,Email,Password,github,linkedin,profilePic}=userDetails

  if(linkedin && github)
  {
    const reqBody=new FormData()
    reqBody.append("Username",Username)
    reqBody.append("Email",Email)
    reqBody.append("Password",Password)
    reqBody.append("github",github)
    reqBody.append("linkedin",linkedin)
    preview? reqBody.append("profilePic",profilePic):reqBody.append("profilePic",existingProfileImg)

    const token=sessionStorage.getItem("token")
    if(token)
    {
      const reqHeader={
        "Content-Type":"multipart/form-data",
        "Authorization":`Bearer ${token}`
      }

      //api call
      try{
        const result=await updateUserAPI(reqBody,reqHeader)
        if(result.status==200){
          alert("User profile updated successfully")
          sessionStorage.setItem("user",JSON.stringify(result.data))
          setOpen(!open)
        }
        else{
          console.log(result);
          
        }
      }
      catch(err)
      {
          console.log(err);
          
      }
    }
  }
  else{
    alert("please fill the form completely")
  }
}

  return (
    <>
    
    <div className="d-flex justify-content-evenly">
    <h3 className="text-warning">Profile</h3>
    <button   onClick={() => setOpen(!open)} className='btn text-warning'><i className='fa-solid fa-chevron-down'></i></button>
    
    </div>
    <Collapse in={open}>
        <div className='row align-items-center container-fluid justify-content-center shadow p-2 rounded' id="example-collapse-text">
          <label className='text-center mb-2'>
            <input onChange={e=>setUserDetails({...userDetails,profilePic:e.target.files[0]})} type="file" style={{display:'none'}} />
           {
            existingProfileImg==""?
            <img width={'200px'} height={'200px'} className='rounded-circle' src={preview?preview:proImg} alt="" />
            :
            <img width={'200px'} height={'200px'} className='rounded-circle' src={preview?preview : `${SERVER_URL}/uploads/${existingProfileImg}`} alt="" />
           }
          </label>
          <div className="mb-2 w-100">
          <input onChange={e=>setUserDetails({...userDetails,github:e.target.value})} value={userDetails.github} type="text " className='form-control' placeholder='User GITHUB PROFILE link' />
        </div>
        <div className="mb-2 w-100">
          <input value={userDetails.linkedin} onChange={e=>setUserDetails({...userDetails,linkedin:e.target.value})} type="text " className='form-control' placeholder='User Linkedin PROFILE link' />
        </div>
        <div className="d-grid w-100">
          <button onClick={handleUpdateProfile} className='btn btn-warning'>Update Profile</button>
        </div>
        </div>
      </Collapse>
    </>
  )
}

export default Profile