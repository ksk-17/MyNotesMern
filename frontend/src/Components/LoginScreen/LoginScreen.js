import React, { useState,useEffect } from 'react'
import MainTitle from '../MainTitle'
import { Form,Button, Row, Col } from "react-bootstrap"
import { Link,useNavigate } from "react-router-dom"
import "./LoginScreen.css"
import Loading from '../Loading/Loading'
import ErrorMessage from '../ErrorMessage/ErrorMessage'
import { useDispatch, useSelector } from "react-redux"
import { login } from '../../actions/userAction'

const LoginScreen = () => {

    let navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch= useDispatch();   

    //retreving the information from the state
    const userLogin = useSelector((state)=>state.userLogin);
    const {loading,error, userInfo} = userLogin;

    useEffect(() => {

      if(localStorage.getItem("userInfo")){
        const userInfo = localStorage.getItem("userInfo");
      }
      if(userInfo){
        navigate('/mynotes');
       }
      
    }, [userInfo]);
    
    
    //calling the action
    const submitHandler=async(e)=>{
        e.preventDefault();
        dispatch(login(email,password));
    };


  return (
    <MainTitle title="LOGIN">
        <div className="loginContainer">
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            {loading && <Loading/>}
          <Form onSubmit={submitHandler}>
              <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email"
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                  placeholder="Enter email" />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password"
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                  placeholder="Enter password" />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
          </Form>
          <Row>
              <Col>
                 New Customer ? <Link to="/register">Register Here</Link>
              </Col>
              
          </Row>
        </div>
    </MainTitle>
    
  )
}

export default LoginScreen