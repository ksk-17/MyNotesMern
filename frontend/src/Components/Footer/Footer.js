import React from 'react'
import './Footer.css'
import { Col, Container, Row } from "react-bootstrap"

const Footer = () => {
  return (
    <div>
      <Container className="footer">
        <Row>
          <Col className="text-center py-3">
            Copryright &copy; MyNotes
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Footer