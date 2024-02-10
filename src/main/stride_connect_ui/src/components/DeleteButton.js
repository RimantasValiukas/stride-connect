import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {deletePoll} from "../api/pollApi";


const DeleteButton = ({ deleteFunction }) => {
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    const handleOpen = () => setOpen(true);

    return (
        <>
            <Button size="sm" variant="danger" style={{marginLeft: '10px'}} onClick={handleOpen}>
                IŠTRINTI
            </Button>
            <Modal show={open} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Patvirtinti ištrynimą</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Ar tikrai norite ištrinti?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Atšaukti
                    </Button>
                    <Button variant="danger" onClick={deleteFunction}>
                        Ištrinti
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default DeleteButton;
