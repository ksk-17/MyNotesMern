import React, { useEffect, useState } from 'react'
import { Form,Button, Row, Col } from 'react-bootstrap'
import { Link,useNavigate } from 'react-router-dom'
import ErrorMessage from '../ErrorMessage/ErrorMessage'
import Loading from '../Loading/Loading'
import MainTitle from '../MainTitle'
import "./RegisterScreen.js"
import {useDispatch, useSelector} from "react-redux"
import { register } from '../../actions/userAction'

const RegisterScreen = () => {

  let navigate = useNavigate();

  const [name, setName] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pic, setPic] = useState(
    "https://img.icons8.com/ios/50/000000/user--v1.png"
  )
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [picMessage, setPicMessage] = useState(null);

  const dispatch=useDispatch();

    const userRegistration=useSelector((state)=>state.userRegistration);
    const {loading,error,userInfo} = userRegistration;

    useEffect(() => {
      if(userInfo){
        navigate('/mynotes');
      }
      
    }, [userInfo])
    

  const submitHandler = async(e) =>{
    e.preventDefault();

    if(password !== confirmPassword){
      setMessage('Passwords didn\'t match')
    }
    else{
      dispatch(register(name,email,password,pic));
    }
  }

  const postDetails = (pics)=>{
    if(!pics){
      return setPicMessage("Please Select an Image");
    }
    setPicMessage(null);

    if(pics.type === 'image/jpeg' || pics.type === 'image/png'){
      const data =  new FormData();
      data.append('file',pics);
      data.append('upload_preset','MyNotes');
      data.append('cloud_name','dhkih4xml');
      fetch("https://api.cloudinary.com/v1_1/dhkih4xml/image/upload",{
        method : "post",
        body: data,
      }).then((res)=>res.json())
      .then((data)=>{
        console.log(data);
        setPic(data.url.toString());
      }).catch((err)=>{
        console.log(err);
      })
    }
    else{
      return setPicMessage("Please Select an Image");
    }
  }

  return (
    <MainTitle title="Register">
      <div className="registerContainer">
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
        {loading && <Loading />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="Name">
            <Form.Label>Name</Form.Label>
            <Form.Control type="name"
            value={name}
            onChange={(e)=>{setName(e.target.value)}} 
            placeholder="Enter Name"/>
          </Form.Group>
          <Form.Group controlId="Email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control type="email" 
            value={email}
            onChange={(e)=>{setEmail(e.target.value)}}
            placeholder="Enter email"/>
          </Form.Group>
          <Form.Group controlId="Password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" 
            value={password}
            onChange={(e)=>{setPassword(e.target.value)}}
            placeholder="Enter password"/>
          </Form.Group>
          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="password" 
            value={confirmPassword}
            onChange={(e)=>{setConfirmPassword(e.target.value)}}
            placeholder="Confirm password"/>
          </Form.Group>

          {picMessage && <ErrorMessage variant="danger">{picMessage}</ErrorMessage>}

          <Form.Group controlId="pic">
            <Form.Label>Profile Picture</Form.Label>
            <Form.Control
            type="file" 
            onChange={(e)=>postDetails(e.target.files[0])} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Register
          </Button>
        </Form>
        <Row>
              <Col>
                 Already has an account ? <Link to="/login">Login Here</Link>
              </Col>
              
          </Row>
      </div>
    </MainTitle>
  )
}

export default RegisterScreen