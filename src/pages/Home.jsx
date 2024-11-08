import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import landing from '../assets/landing.png'
import ProjectCard from '../components/ProjectCard'
import { Card } from 'react-bootstrap'
import { getHomeProjectAPI } from '../services/allAPI'


const Home = () => {

  

  const [allHomeProjects,setAllHomeProjects]=useState([])
  const navigate=useNavigate()

  useEffect(()=>{
    getAllHomeProjects()
  },[])

  const getAllHomeProjects=async()=>{
    try{
    const result=await getHomeProjectAPI()
    if(result.status==200)
    {
      setAllHomeProjects(result.data)
    }
    }
    catch(err)
    {
        console.log(err);
        
    }

  }
  console.log(allHomeProjects);
  

  const handleProjects=()=>{
    if(sessionStorage.getItem("token"))
    {
      navigate('/Projects')
    }
    else{
      alert("Please login to get full access to the projects")
    }
  }
  return (
   <>
      <div style={{minHeight:'100vh'}} className='d-flex justify-content-center align-items-center rounded shadow w-100'>
        <div className='container'>
          <div className='row align-items-center'>
            <div className="cil-lg-6">
              <h1 style={{fontSize:'80px'}}><i className='fa-brands fa-docker'></i>Project Fair</h1>
              <p style={{textAlign:'justify'}}> One stop destination for all software Developement projects.where user can add and manage their projects ,as well acess all projects avaliable in our website...what are you waiting for</p>
              {
                sessionStorage.getItem("token")?
                <Link to={'/dashboard'} className='btn btn-warning' > MANAGE YOUR PROJECTS</Link>
                :
              <Link to={'/Login'} className='btn btn-warning' > STARTS TO EXPLORE</Link>
              }
  
            </div>
     <div className='col-lg-6'>
      <img src={landing} alt='landing' style={{width:'100%',height:'100'
      }}/>
     </div>
          </div>
  
        </div>
  
      </div>
      <div className="mt-5 text-center">
<h1 className='mb-5'>Explore Our Projects </h1>
<marquee behavior="" direction="">
  <div className='d-flex'>
    {
      allHomeProjects?.map(project=>(
        <div key={project?._id} className="me-5">
      <ProjectCard displayData={project}/>
    </div>
      ))
      
    }
  </div>
</marquee>
<button onClick={handleProjects} className='btn btn-link mt-5'> CLICK HERE  TO SEE MORE PROJECTS</button>

      </div>
      <div className="d-flex justify-content-center align-items-center mt-5 flex-column">
        <h1>OUR TESTIMONIALS</h1>
        <div className="d-flex justify-content-evenly align-items-center mt-3 w-100">
        <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title className='d-flex align-items-center justify-content-center flex-column'>
          <img width={'60px'}  height={'60px'} className='rounded-circle img-fluid' src="https://cdn.vectorstock.com/i/1000x1000/32/85/male-person-icon-man-design-graphic-vector-9473285.webp" alt="" />
          <span>Akshay</span>
        </Card.Title>
        <Card.Text>
        <div className="d-flex justify-content-center align-items-center ">
          <i className="fa-solid fa-star text-warning"></i>
          <i className="fa-solid fa-star text-warning"></i>
          <i className="fa-solid fa-star text-warning"></i>
          <i className="fa-solid fa-star text-warning"></i>
          <i className="fa-solid fa-star text-warning"></i>

          </div>
          <p style={{textAlign:'justify'}}> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorem, recusandae doloribus non blanditiis sunt repudiandae voluptas veniam adipisci fuga vitae corporis sapiente,</p>


        </Card.Text>
      </Card.Body>
    </Card>
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title className='d-flex align-items-center justify-content-center flex-column'>
          <img width={'60px'}  height={'60px'} className='rounded-circle img-fluid' src="https://cdn.vectorstock.com/i/1000x1000/32/85/male-person-icon-man-design-graphic-vector-9473285.webp" alt="" />
          <span>Akshay</span>
        </Card.Title>
        <Card.Text>
        <div className="d-flex justify-content-center align-items-center ">
          <i className="fa-solid fa-star text-warning"></i>
          <i className="fa-solid fa-star text-warning"></i>
          <i className="fa-solid fa-star text-warning"></i>
          <i className="fa-solid fa-star text-warning"></i>
          <i className="fa-solid fa-star text-warning"></i>

          </div>
          <p style={{textAlign:'justify'}}> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorem, recusandae doloribus non blanditiis sunt repudiandae voluptas veniam adipisci fuga vitae corporis sapiente,</p>


        </Card.Text>
      </Card.Body>
    </Card>
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title className='d-flex align-items-center justify-content-center flex-column'>
          <img width={'60px'}  height={'60px'} className='rounded-circle img-fluid' src="https://cdn.vectorstock.com/i/1000x1000/32/85/male-person-icon-man-design-graphic-vector-9473285.webp" alt="" />
          <span>Akshay</span>
        </Card.Title>
        <Card.Text>
        <div className="d-flex justify-content-center align-items-center ">
          <i className="fa-solid fa-star text-warning"></i>
          <i className="fa-solid fa-star text-warning"></i>
          <i className="fa-solid fa-star text-warning"></i>
          <i className="fa-solid fa-star text-warning"></i>
          <i className="fa-solid fa-star text-warning"></i>

          </div>
          <p style={{textAlign:'justify'}}> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorem, recusandae doloribus non blanditiis sunt repudiandae voluptas veniam adipisci fuga vitae corporis sapiente,</p>


        </Card.Text>
      </Card.Body>
    </Card>
</div>
.      </div>
   </>
    
  )
}

export default Home