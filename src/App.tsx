import React, { useContext, useEffect } from 'react';
import AppContext from './assets/context/appContext';
import { videoDataType } from './assets/types/types';
import { Container, Row, Col } from 'react-bootstrap';
import Logo from './atoms/Logo';
import InputVideo from './molecules/InputVideo';
import VideoList from './organisms/VideoList';
import VideoCard from './molecules/VideoCard';

export default function App() {
  const appCtx = useContext(AppContext);
  const list = appCtx.videos.map((video: videoDataType) => <VideoCard key={video.VIDEO.id} videoData={video} display={appCtx.listDisplay} />);

  useEffect(() => {
    appCtx.handleInitVideoList();
    window.addEventListener('resize', () => {
      window.innerWidth < 570 ? appCtx.handleListDisplay() : null
    })
  }, [])

  return (
    <Container fluid>
      <Row>
        <Col><Logo /></Col>
      </Row>
      <Row>
        <Col><InputVideo clickHandler={appCtx.handleAddVideo} /></Col>
      </Row>
      <Row>
        <Col><VideoList list={list} /></Col>
      </Row>
    </Container>
  )
}
