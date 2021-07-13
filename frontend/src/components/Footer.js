import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => {
  const thisYear = new Date()
  return (
    <footer>
      <Container>
        <Row>
          <Col className='text-center py-3'>
            <p>
              Copyright &copy; {thisYear.getFullYear()}, PinazzaShop. All Rights
              Reserved{' '}
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
