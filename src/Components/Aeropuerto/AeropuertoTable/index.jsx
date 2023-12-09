import React, { useState } from 'react';
import { Table, Button, Card, Modal, Spinner } from 'react-bootstrap';
import { FiEdit, FiTrash2, FiPlus } from 'react-icons/fi';

const AeropuertoTable = ({ aeropuertos, onEdit, onDelete, onAdd, loading }) => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedAeropuerto, setSelectedAeropuerto] = useState(null);

    const handleDeleteClick = (aeropuerto) => {
        setSelectedAeropuerto(aeropuerto);
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = () => {
        onDelete(selectedAeropuerto.ID);
        setShowDeleteModal(false);
    };

    const deleteModal = (
        <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Confirmar Eliminación</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                ¿Estás seguro de que deseas borrar el aeropuerto {selectedAeropuerto?.Nombre}?
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
                <Card.Title>Lista de Aeropuertos</Card.Title>
                <Button variant="primary" onClick={onAdd} className="mb-3">
                    <FiPlus /> Agregar Aeropuerto
                </Button>
                {loading ? (
                    <div className="text-center">
                        <Spinner
                            animation="border"
                            role="status"
                        />
                    </div>
                ) : (
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                {/* Otras columnas de la tabla de aeropuertos */}
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {aeropuertos.map((aeropuerto) => (
                                <tr key={aeropuerto.ID}>
                                    <td>{aeropuerto.ID}</td>
                                    <td>{aeropuerto.Nombre}</td>
                                    {/* Otras celdas de la tabla de aeropuertos */}
                                    <td>
                                        <div className="d-flex gap-2">
                                            <Button variant="info" onClick={() => onEdit(aeropuerto)}>
                                                <FiEdit />
                                            </Button>
                                            <Button variant="danger" onClick={() => handleDeleteClick(aeropuerto)} className="ml-2">
                                                <FiTrash2 />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </Card.Body>
        </Card>
    );
};

export default AeropuertoTable;
