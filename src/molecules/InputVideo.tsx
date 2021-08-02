import React from 'react'
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl'

export default function InputVideo() {
  return (
    <InputGroup className="mb-3">
      <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
      <FormControl
        placeholder="Video URL or ID"
        aria-label="Video URL or ID"
        aria-describedby="basic-addon1"
      />
    </InputGroup>
  )
}
