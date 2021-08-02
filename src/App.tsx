import React from 'react';

import { Container, Row, Col } from 'react-bootstrap';
import Logo from './atoms/Logo';
import InputVideo from './molecules/InputVideo';
import VideoList from './organisms/VideoList';

export default function App() {
  return (
    <Container>
      <Row>
        <Col><Logo /></Col>
      </Row>
      <Row>
        <Col><InputVideo /></Col>
      </Row>
      <Row>
        <Col><VideoList /></Col>
      </Row>
    </Container>
  )
}
