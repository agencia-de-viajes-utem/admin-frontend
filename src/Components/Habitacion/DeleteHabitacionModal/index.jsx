// src/Components/Habitacion/DeleteHabitacionModal.js
import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const DeleteHabitacionModal = ({ show, onHide, onDelete }) => {
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Confirmar Eliminación</Modal.Title>
            </Modal.Header>
            <Modal.Body>¿Estás seguro de que deseas eliminar esta habitación?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Cancelar
                </Button>
                <Button variant="danger" onClick={onDelete}>
                    Eliminar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteHabitacionModal;
