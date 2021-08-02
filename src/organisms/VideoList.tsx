import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import VideoCard from '../molecules/VideoCard';
import ListControls from '../molecules/ListControls';
import ListPagination from '../molecules/ListPagination';

export default function VideoList() {
  return (
    <Container>
      <Row><ListControls /></Row>
      <Row><VideoCard /><VideoCard /><VideoCard /></Row>
      <Row ><ListPagination /></Row>
    </Container>
  )
}
