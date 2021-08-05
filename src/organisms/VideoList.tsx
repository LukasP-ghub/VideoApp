import React, { useContext } from 'react'
import AppContext from '../assets/context/appContext';
import { videoDataType } from '../assets/types/types';
import { Container, Row, Col } from 'react-bootstrap';
import VideoCard from '../molecules/VideoCard';
import ListControls from '../molecules/ListControls';
import ListPagination from '../molecules/ListPagination';

export default function VideoList() {
  const appCtx = useContext(AppContext);
  return (
    <Container>
      <Row><ListControls /></Row>
      <Row>{appCtx.videos.length > 0 && appCtx.videos.map((video: videoDataType) => { console.log(video); return <VideoCard key={video.VIDEO.id} videoData={video} /> })}</Row>
      <Row ><ListPagination /></Row>
    </Container>
  )
}
