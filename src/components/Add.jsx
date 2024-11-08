import React, { useContext, useEffect, useState } from 'react'
import { Modal,Button } from 'react-bootstrap'
import placeImg from '../assets/place.png'
import { addProjectAPI } from '../services/allAPI';
import { addProjectResponseContext } from '../contexts/ContextAPI';
const Add = () => {
  const{addProjectResponse,setAddProjectResponse}=useContext(addProjectResponseContext)
  const [show, setShow] = useState(false);
  const handleClose = () => 
    {setShow(false);
      setPreview("");
      setImageFileStatus(false);
      setProjectDetails({title:"",languages:"",overview:"",github:"",website:"", projectImg:""})

    }
  const handleShow = () => setShow(true);
  const[imageFileStatus,setImageFileStatus]=useState(false)
  const[preview,setPreview]=useState("")

  const[projectDetails,setProjectDetails]=useState({
    title:"",languages:"",overview:"",github:"",website:"", projectImg:""
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

  const handleAddProject=async()=>
  {
    const{title,languages,overview,github,website,projectImg}=projectDetails

    if(title&&languages&&overview&&github&&website&&projectImg)
    {
    //alert("proceed to api")
    const reqBody=new FormData()
    reqBody.append("title",title)
    reqBody.append("languages",languages)
    reqBody.append("overview",overview)
    reqBody.append("github",github)
    reqBody.append("website",website)
    reqBody.append("projectImg",projectImg)

    const token=sessionStorage.getItem("token")
    if(token)
    {
      const reqHeader={
        "Content-Type":"multipart/form-data",
        "Authorization":`Bearer ${token}`
      }
      //make api call
      try{
        const result=await addProjectAPI(reqBody,reqHeader)
        if(result.status==200)
        {
            alert("project added successfully")
            setAddProjectResponse(result)
            setProjectDetails({ title: "", languages: "", overview: "", github: "", website: "", projectImg: "" });
            setPreview("");
            setImageFileStatus(false);
            setShow(false); // Close the modal
        }
        else{
          
          alert(result.response.data)
        }
      }
      catch(err)
      {
        console.log(err);
      }
    }
    }
    else{
      alert("fill all fields")
    }
  }
  
  return (
    <>
    <button onClick={handleShow} className='btn btn-primary'>+New Project</button>
    <Modal centered size='lg'
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>New Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         <div className="row align-items-center">
          <div className="col-lg-4">
            <label >
              <input onChange={e=>setProjectDetails({...projectDetails,projectImg:e.target.files[0]})} style={{display:'none'}} type="file" />
              <img height={'200px'} className='img-fluid' src={preview?preview:placeImg} alt="" />
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
          <Button onClick={handleAddProject} variant="primary">Add</Button>
        </Modal.Footer>
      </Modal>
    
    </>
  )
}

export default Add