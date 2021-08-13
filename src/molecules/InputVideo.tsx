import React, { useRef } from 'react'
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

export default function InputVideo({ clickHandler }: { clickHandler: (ref: any) => void }) {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <InputGroup className="mx-auto mb-3" style={{ maxWidth: '600px' }}>
      <Button variant="secondary" type='submit' id="send-button" onClick={() => clickHandler(ref)}>Dodaj</Button>
      <FormControl
        placeholder="Video URL or ID"
        aria-label="Video URL or ID"
        aria-describedby="send-button"
        ref={ref}
      />
    </InputGroup>
  )
}
