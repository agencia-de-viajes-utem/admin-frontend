import React, { useState } from 'react';
import { Table, Button, Card, Modal } from 'react-bootstrap';
import { FiEdit, FiTrash2, FiPlus } from 'react-icons/fi';

const TipoHabitacionTable = ({ tiposHabitacion, onEdit, onDelete, onAdd }) => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedTipoHabitacion, setSelectedTipoHabitacion] = useState(null);

    const handleDeleteClick = (tipoHabitacion) => {
        setSelectedTipoHabitacion(tipoHabitacion);
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = () => {
        onDelete(selectedTipoHabitacion.ID);
        setShowDeleteModal(false);
    };

    const deleteModal = (
        <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Confirmar Eliminación</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                ¿Estás seguro de que deseas borrar el tipo de habitación {selectedTipoHabitacion?.Nombre}?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Cancelar</Button>
                <Button variant="danger" onClick={handleConfirmDelete}>Eliminar</Button>
            </Modal.Footer>
        </Modal>
    );

    return (
        <Card className="shadow-sm p-3 mb-5 bg-white rounded">
            {deleteModal}
            <Card.Body>
                <Card.Title>Lista de Tipos de Habitación</Card.Title>
                <Button variant="primary" onClick={onAdd} className="mb-3">
                    <FiPlus /> Agregar Tipo de Habitación
                </Button>
                {tiposHabitacion && tiposHabitacion.length > 0 ? (
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Tipo</th>
                                <th>Capacidad</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tiposHabitacion.map((tipoHabitacion) => (
                                <tr key={tipoHabitacion.ID}>
                                    <td>{tipoHabitacion.ID}</td>
                                    <td>{tipoHabitacion.Nombre}</td>
                                    <td>{tipoHabitacion.Capacidad}</td>
                                    <td>
                                        <div className="d-flex gap-2">
                                            <Button variant="info" onClick={() => onEdit(tipoHabitacion)}>
                                                <FiEdit />
                                            </Button>
                                            <Button variant="danger" onClick={() => handleDeleteClick(tipoHabitacion)}>
                                                <FiTrash2 />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                ) : (
                    <p>No hay tipos de habitación disponibles.</p>
                )}
            </Card.Body>
        </Card>
    );
};

export default TipoHabitacionTable;
