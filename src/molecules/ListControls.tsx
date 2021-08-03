import React, { useContext } from 'react'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button'
import { DropdownButton, Dropdown } from 'react-bootstrap'
import AppContext from '../assets/context/appContext'

export default function ListControls() {
  const appCtx = useContext(AppContext);

  return (
    <ButtonGroup>
      <Button>Kafelki</Button>
      <Button onClick={() => appCtx.handleLoadDefaultVideos()}>Wgraj domyślne filmy</Button>
      <Button>Usuń wszystkie</Button>
      <Button>Tylko ulubione</Button>

      <DropdownButton as={ButtonGroup} title="Sortuj" id="bg-nested-dropdown">
        <Dropdown.Item eventKey="1">Ostatnio dodane</Dropdown.Item>
        <Dropdown.Item eventKey="2">Najstarsze</Dropdown.Item>
      </DropdownButton>
    </ButtonGroup>
  )
}
