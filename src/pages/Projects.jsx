import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Row,Col } from 'react-bootstrap'
import ProjectCard from '../components/ProjectCard'
import { allProjectAPI } from '../services/allAPI'


const Projects = () => {
  const [searchKey,setSearchKey]=useState("")
  const[allProjects,setAllProjects]=useState([])
  console.log(allProjects);

  useEffect(()=>
  {
    getAllProjects()
  },[searchKey])

  const getAllProjects=async()=>{
    const token=sessionStorage.getItem("token")
    if(token)   
    {
      const reqHeader={
        "Authorization":`Bearer ${token}`
      }
      try{
        const result=await allProjectAPI(searchKey,reqHeader)
        if(result.status==200)
        {
          setAllProjects(result.data)
        }
      }catch(err)
      {
        console.log(err);
        
      }
    }
  }
  
  return (
    <div>
        <Header/>
        <div style={{paddingTop:'150px'}} className='container-fluid'>
            <div className="d-flex justify-content-between">
              <h1>All Projects</h1>
              <input onChange={e=>setSearchKey(e.target.value)} placeholder='Search Projects by Their Languages' type="text" className='form-control w-25' />
            </div>
            <Row className='mt-3'>
                  {
                   allProjects?.length>0?
                   allProjects?.map(project=>(
                    <Col key={project?._id} className='mb-3' sm={12} md={6} lg={4}>
                    <ProjectCard displayData={project}/>
                  </Col>
                   ))
                   :
                   <div className="text-danger fw-bolder">Project not found</div>
                  }
            </Row>
        </div>
    </div>
  )
}

export default Projects