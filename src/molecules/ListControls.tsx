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
      <Button onClick={() => appCtx.handleClearList()}>Usuń wszystkie</Button>
      <Button onClick={() => appCtx.handleSortList('favorite')}>Tylko ulubione</Button>

      <DropdownButton as={ButtonGroup} title="Sortuj" id="bg-nested-dropdown">
        <Dropdown.Item eventKey="1" onClick={() => appCtx.handleSortList('last-added')}>Ostatnio dodane</Dropdown.Item>
        <Dropdown.Item eventKey="2" onClick={() => appCtx.handleSortList('oldest')}>Najstarsze</Dropdown.Item>
      </DropdownButton>
    </ButtonGroup>
  )
}
