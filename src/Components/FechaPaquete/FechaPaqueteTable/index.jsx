import React, { useState } from 'react';
import { Table, Button, Card, Modal, Spinner } from 'react-bootstrap';
import { FiEdit, FiTrash2, FiPlus } from 'react-icons/fi';

const FechaPaqueteTable = ({ fechasPaquete, onEdit, onDelete, onAdd, loading }) => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedFechaPaquete, setSelectedFechaPaquete] = useState(null);

    const handleDeleteClick = (fechaPaquete) => {
        setSelectedFechaPaquete(fechaPaquete);
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = () => {
        onDelete(selectedFechaPaquete.ID);
        setShowDeleteModal(false);
    };

    const deleteModal = (
        <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Confirmar Eliminación</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                ¿Estás seguro de que deseas borrar la fecha de paquete {selectedFechaPaquete?.Nombre}?
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
                <Card.Title>Lista de Fechas de Paquete</Card.Title>
                <Button variant="primary" onClick={onAdd} className="mb-3">
                    <FiPlus /> Agregar Fecha de Paquete
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
                                <th>Fecha</th>
                                {/* Otras columnas de la tabla de fechas de paquete */}
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {fechasPaquete.map((fechaPaquete) => (
                                <tr key={fechaPaquete.ID}>
                                    <td>{fechaPaquete.ID}</td>
                                    <td>{fechaPaquete.Fecha}</td>
                                    {/* Otras celdas de la tabla de fechas de paquete */}
                                    <td>
                                        <div className="d-flex gap-2">
                                            <Button variant="info" onClick={() => onEdit(fechaPaquete)}>
                                                <FiEdit />
                                            </Button>
                                            <Button variant="danger" onClick={() => handleDeleteClick(fechaPaquete)} className="ml-2">
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

export default FechaPaqueteTable;
