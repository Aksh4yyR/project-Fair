import React, { useState } from 'react'
import {  Card, Modal } from 'react-bootstrap'
import SERVER_URL from '../services/serverUrl';
const ProjectCard = ({displayData}) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
    <Card onClick={handleShow} className='btn shadow' >
    <Card.Img height={'200px'} variant="top" src={`${SERVER_URL}/uploads/${displayData?.projectImg}`} />
    <Card.Body>
      <Card.Title>{displayData?.title}</Card.Title>
    </Card.Body>
  </Card>
  <Modal size='lg' centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-lg-6">
              <img className='img-fluid' src={`${SERVER_URL}/uploads/${displayData?.projectImg}`} alt="" />
            </div>
            <div className="col-lg-6">
              <h3>{displayData?.title}</h3>
              <h6 className='fw-bolder'>Languages used: <span className='text-danger'>{displayData?.languages}</span></h6>
              <p style={{textAlign:'justify'}}> <span className='fw-bolder'> Project Overview:</span> {displayData?.overview}</p>
            </div>
          </div>
          <div className="mt-2 float-start">

            <a href="https://github.com/Aksh4yyR/calculator.git" className='btn btn-secondary' target='_blank'><i className='fa-brands fa-github'></i></a>
            <a href="https://calculatorjs32.netlify.app/" className='btn btn-secondary ms-2' target='_blank'><i className='fa-solid fa-link'></i></a>
          </div>



        </Modal.Body>
        
      </Modal>
  
  </>
  )
}

export default ProjectCard