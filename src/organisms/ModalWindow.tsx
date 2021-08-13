import React, { useContext } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import AppContext from '../assets/context/appContext';

export default function ModalWindow({ click }: { click: () => void }) {
  const appCtx = useContext(AppContext);
  return (
    <Modal
      show
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      fullscreen={true}
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          { }
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* <video
          src={`${appCtx.showModal.link}`}
          width="100%">
        </video> */}
        <iframe width="100%" height="100%"
          src={`${appCtx.showModal.link}`}></iframe>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={click}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
