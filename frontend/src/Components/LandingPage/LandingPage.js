import './LandingPage.css';
import {Container,Row,Button} from "react-bootstrap";

import React, { useEffect } from 'react'
import { useNavigate } from 'react-router';
import {Link} from "react-router-dom"

const LandingPage = () => {

  let navigate = useNavigate();

    useEffect(() => { 
        const userInfo = localStorage.getItem("userInfo");
        if(userInfo){
            navigate("/mynotes");
        }
    }, [navigate]);

  return (
    <div className="landingpage">
      <Container>
        <Row>
          <div className="title">
            <h1>
              Welcome To MyNotes
            </h1>
            <div className="buttonContainer">
              <Link to="/login">
                <Button>Login</Button>
              </Link>
              <Link to="/register">
                <Button varient="outline-primary">Register</Button>
              </Link>
            </div>
          </div>
        </Row>
      </Container>
    </div>
  )
}

export default LandingPage