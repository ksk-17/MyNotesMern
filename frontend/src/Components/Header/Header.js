import React, { useEffect } from 'react'
import { Button,Form,Container, FormControl, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux';
import {Link,useNavigate} from 'react-router-dom';
import { logout } from '../../actions/userAction';

const Header = () => {
  let navigate = useNavigate();
  const dispatch= useDispatch();

  const userLogin = useSelector((state)=>state.userLogin);
  const { userInfo} = userLogin;


  return (
    <div>
      <Navbar bg="primary" expand="lg" variant="dark">
        <Container>
          <Navbar.Brand>
            <Link to="/" style={{ textDecoration: 'none',color: 'white' }}>MyNotes</Link>
          </Navbar.Brand>
          {(userInfo)?<div><Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Form className="d-flex">
                  <FormControl
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                  />
                  <Button variant="outline-light">Search</Button>
                </Form>
            </Nav>
            <Nav className="m-auto">
              <Nav.Link>
                <Link to="/mynotes" style={{ textDecoration: 'none',color: 'white' }}>Notes</Link>
              </Nav.Link>
              <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                <NavDropdown.Item onClick={()=>{navigate('/profile')}}>My Profile</NavDropdown.Item>
                <NavDropdown.Item onClick={()=>{
                  dispatch(logout());
                  navigate('/');
                }
                }>Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse></div>
          :
          <div></div>}
        </Container>
      </Navbar>    
    </div>
  )
}

export default Header