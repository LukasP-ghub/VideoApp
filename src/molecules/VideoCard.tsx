import React from 'react'
import Card from 'react-bootstrap/Card'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button'
import VideoInfo from '../atoms/VideoInfo'

export default function VideoCard() {
  return (
    <Card className="flex-row align-items-center">
      <Card.Img variant="top" src="holder.js/100px180" style={{ maxWidth: '350px' }} />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <div>
          <div><VideoInfo content={`Odtworzenia: `} /><VideoInfo content={`0`} /></div>
          <div><VideoInfo content={`Polubienia: `} /><VideoInfo content={`0`} /></div>
          <div><VideoInfo content={`Data dodania: `} /><VideoInfo content={`0`} /></div>
        </div>
      </Card.Body>
      <ButtonGroup aria-label="Basic example" vertical>
        <Button variant="secondary">Obejrzyj</Button>
        <Button variant="secondary">Usuń</Button>
        <Button variant="secondary">Dodaj do ulubionych</Button>
      </ButtonGroup>
    </Card>
  )
}
