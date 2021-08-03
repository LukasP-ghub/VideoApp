import React, { useContext } from 'react';
import AppContext from './assets/context/appContext';
import { Container, Row, Col } from 'react-bootstrap';
import Logo from './atoms/Logo';
import InputVideo from './molecules/InputVideo';
import VideoList from './organisms/VideoList';

export default function App() {
  const appCtx = useContext(AppContext);

  return (
    <Container>
      <Row>
        <Col><Logo /></Col>
      </Row>
      <Row>
        <Col><InputVideo clickHandler={appCtx.handleAddVideo} /></Col>
      </Row>
      <Row>
        <Col><VideoList /></Col>
      </Row>
    </Container>
  )
}
