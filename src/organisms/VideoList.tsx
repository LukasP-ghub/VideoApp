import React, { useContext } from 'react'
import AppContext from '../assets/context/appContext';
import { Container, Row, Col } from 'react-bootstrap';
import VideoCard from '../molecules/VideoCard';
import ListControls from '../molecules/ListControls';
import ListPagination from '../molecules/ListPagination';

export default function VideoList() {
  const appCtx = useContext(AppContext);
  return (
    <Container>
      <Row><ListControls /></Row>
      <Row>{appCtx.videos.map((video) => <VideoCard videoData={video} />)}</Row>
      <Row ><ListPagination /></Row>
    </Container>
  )
}
