import React, { useContext } from 'react'
import AppContext from '../assets/context/appContext';
import { Container, Row } from 'react-bootstrap';
import ListControls from '../molecules/ListControls';
import ListPagination from '../molecules/ListPagination';

export default function VideoList({ list }: { list: JSX.Element[] }) {
  const appCtx = useContext(AppContext);
  return (
    <Container fluid>
      <Row><ListControls /></Row>
      <Row className='justify-content-evenly'>{list.length > 0 && list}</Row>
      <Row ><ListPagination /></Row>
    </Container>
  )
}
