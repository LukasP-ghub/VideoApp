import React, { useContext } from 'react'
import Card from 'react-bootstrap/Card'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button'
import { videoDataType, listDisplayType } from '../assets/types/types'
import AppContext from '../assets/context/appContext';
import VideoInfo from '../atoms/VideoInfo'

interface videoCardType {
  videoData: videoDataType,
  display: listDisplayType,
}

export default function VideoCard({ videoData, display }: videoCardType) {
  const appCtx = useContext(AppContext);
  const styles = display === 'list' ? { flexDirection: 'flex-row', maxWidth: '100%' } : { flexDirection: 'flex-column', maxWidth: '350px' };
  return (
    <Card className={`${styles.flexDirection} align-items-center py-2 m-2 shadow`} style={{ maxWidth: `${styles.maxWidth}` }} >
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
        <Button variant="secondary" onClick={() => appCtx.handleShowModal(videoData.VIDEO.link)}>Obejrzyj</Button>
        <Button variant="secondary" onClick={() => appCtx.handleRemoveVideo(videoData.VIDEO.id)}>Usuń</Button>
        <Button variant="secondary" onClick={() => appCtx.handleAddToFavorites(videoData.VIDEO.id)}>Dodaj do ulubionych</Button>
      </ButtonGroup>
    </Card>
  )
}
