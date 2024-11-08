import React, { useContext, useState } from 'react'
import { useEffect } from 'react'
import { Button,Modal } from 'react-bootstrap'
 import uplImg from '../assets/place.png'
import SERVER_URL from '../services/serverUrl'
import { updateProjectAPI } from '../services/allAPI'
import { editProjectResponseContext } from '../contexts/ContextAPI'
const Edit = ({project}) => {
  const{editProjectResponse,setEditProjectResponse}=useContext(editProjectResponseContext)
  const[imageFileStatus,setImageFileStatus]=useState(false)
  const[preview,setPreview]=useState("")

  const[projectDetails,setProjectDetails]=useState({
   id:project._id, title:project.title,languages:project.languages,overview:project.overview,github:project.github,website:project.website, projectImg:""
  })
  console.log(projectDetails);
  useEffect(()=>{
    if(projectDetails.projectImg.type=="image/png" ||  projectDetails.projectImg.type=="image/jpeg" ||  projectDetails.projectImg.type=="image/jpg" )
{
//valid image
setImageFileStatus(true)
setPreview(URL.createObjectURL(projectDetails.projectImg))
}
else
{
//invalid img
setImageFileStatus(false)
setPreview("")
setProjectDetails({...projectDetails,projectImg:""})
}
},[projectDetails.projectImg])
  
  const [show, setShow] = useState(false);

  const handleClose = () =>{
     setShow(false),
    setProjectDetails({
      id:project._id, title:project.title,languages:project.languages,overview:project.overview,github:project.github,website:project.website, projectImg:""
     })};
  const handleShow = () => {
    setShow(true),
    setProjectDetails({
      id:project._id, title:project.title,languages:project.languages,overview:project.overview,github:project.github,website:project.website, projectImg:""
     })
  };
  const handleUpdateProject=async()=>{
    const{id,title,languages,overview,github,website,projectImg}=projectDetails
    if(title&&languages&&overview&&github&&website)
    {
      //api call-put(id,updateDetails)
      const reqBody=new FormData()
      reqBody.append("title",title)
      reqBody.append("languages",languages)
      reqBody.append("overview",overview)
      reqBody.append("github",github)
      reqBody.append("website",website)
       preview?reqBody.append("projectImg",projectImg):reqBody.append("projectImg",project.projectImg)
      const token=sessionStorage.getItem("token")
      if(token)
      {
        //api call
        const reqHeader={
        "Content-Type":"multipart/form-data",
        "Authorization":`Bearer ${token}`
        }
        try{
          const result=await updateProjectAPI(id,reqBody,reqHeader)
          if(result.status==200)
          {
            alert("project updated successfully")
            handleClose()
            setEditProjectResponse(result)
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
    <button className='btn btn-primary' onClick={handleShow}><i className="fa-solid fa-edit"></i></button>
    
    <Modal centered size='lg'
    show={show}
    onHide={handleClose}
    backdrop="static"
    keyboard={false}
  >
    <Modal.Header closeButton>
      <Modal.Title>Update Project Details</Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <div className="row align-items-center">
          <div className="col-lg-4">
            <label >
              <input onChange={e=>setProjectDetails({...projectDetails,projectImg:e.target.files[0]})} style={{display:'none'}} type="file" />
              <img height={'200px'} className='img-fluid' src={preview?preview:`${SERVER_URL}/uploads/${project.projectImg}`} alt="" />
            </label>
            {!imageFileStatus&& <div className="text-warning fw-bolder my-2">
              <p>Upload only the following file types(jpeg,jpg,png)here</p>
            </div>}
          </div>
          <div className="col-lg-8">
            <div className="mb-2">
              <input value={projectDetails.title} onChange={e=>setProjectDetails({...projectDetails,title:e.target.value})} type="text " className='form-control' placeholder='Project Title' />
            </div>
            <div className="mb-2">
              <input type="text " value={projectDetails.languages} onChange={e=>setProjectDetails({...projectDetails,languages:e.target.value})} className='form-control' placeholder='Languages Used in project' />
            </div>
            <div className="mb-2">
              <input type="text " value={projectDetails.overview} onChange={e=>setProjectDetails({...projectDetails,overview:e.target.value})} className='form-control' placeholder='Project Overview' />
            </div>
            <div className="mb-2">
              <input type="text " value={projectDetails.github} onChange={e=>setProjectDetails({...projectDetails,github:e.target.value})} className='form-control' placeholder='Project Github link' />
            </div>
            <div className="mb-2">
              <input type="text " value={projectDetails.website} onChange={e=>setProjectDetails({...projectDetails,website:e.target.value})} className='form-control' placeholder='Project website link' />
            </div>
          </div>
         </div>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        Cancel
      </Button>
      <Button onClick={handleUpdateProject} variant="primary">Update</Button>
    </Modal.Footer>
  </Modal></>
  )
}

export default Edit