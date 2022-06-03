import React from 'react';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import MainTitle from '../MainTitle';
import './Profile.css'

const Profile = () => {
    const userLogin = useSelector((state)=>state.userLogin);
  const { userInfo} = userLogin;
  console.log(userInfo);
  return (
    <Container className='profile'>
      <MainTitle title={`${userInfo.name}`}>
        <Row>
          <Col>
          {(userInfo.pic=="https://img.icons8.com/ios/50/000000/user--v1.png")?
          <div><img src='/user.svg'></img></div>:
          <div><img src={`${userInfo.pic}`}></img></div>}
          </Col>
          <Col>
          <div className='table'>
            <Table striped hover>
              <thead >
                <tr>
                <th scope="col">Attribute</th>
                <th scope="col">value</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Name</th>
                  <td>{userInfo.name}</td>
                </tr>
                <tr>
                  <th scope="row">Email</th>
                  <td>{userInfo.email}</td>
                </tr>
              </tbody>
            </Table>
        </div></Col>
        </Row>
    </MainTitle>
    </Container>
  )
}

export default Profile