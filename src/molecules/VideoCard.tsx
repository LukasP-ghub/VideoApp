import React, { useContext } from 'react'
import Card from 'react-bootstrap/Card'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button'
import { videoDataType } from '../assets/types/types'
import AppContext from '../assets/context/appContext';
import VideoInfo from '../atoms/VideoInfo'

interface videoCardType {
  videoData: videoDataType
}

export default function VideoCard({ videoData }: videoCardType) {
  const appCtx = useContext(AppContext);
  return (
    <Card className="flex-row align-items-center">
      <Card.Img variant="top" src={videoData.VIDEO.thumbnail} style={{ maxWidth: '350px' }} />
      <Card.Body>
        <Card.Title>{videoData.VIDEO.title}</Card.Title>
        <div>
          <div><VideoInfo content={`Odtworzenia: `} /><VideoInfo content={videoData.VIDEO.viewCount} /></div>
          <div><VideoInfo content={`Polubienia: `} /><VideoInfo content={videoData.VIDEO.likeCount} /></div>
          <div><VideoInfo content={`Data dodania: `} /><VideoInfo content={videoData.VIDEO.publishDate} /></div>
        </div>
      </Card.Body>
      <ButtonGroup aria-label="Basic example" vertical>
        <Button variant="secondary">Obejrzyj</Button>
        <Button variant="secondary" onClick={() => appCtx.handleRemoveVideo(videoData.VIDEO.id)}>Usuń</Button>
        <Button variant="secondary" onClick={() => appCtx.handleAddToFavorites(videoData.VIDEO.id)}>Dodaj do ulubionych</Button>
      </ButtonGroup>
    </Card>
  )
}
