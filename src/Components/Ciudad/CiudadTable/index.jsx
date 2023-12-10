import React, { useState } from 'react';
import { Table, Button, Card, Modal, Spinner } from 'react-bootstrap';
import { FiEdit, FiTrash2, FiPlus } from 'react-icons/fi';

const CiudadTable = ({ ciudades, onEdit, onDelete, onAdd, loading }) => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedCiudad, setSelectedCiudad] = useState(null);

    const handleDeleteClick = (ciudad) => {
        setSelectedCiudad(ciudad);
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = () => {
        onDelete(selectedCiudad.ID);
        setShowDeleteModal(false);
    };

    const deleteModal = (
        <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Confirmar Eliminación</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                ¿Estás seguro de que deseas borrar la ciudad {selectedCiudad?.Nombre}?
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
                <Card.Title>Lista de Ciudades</Card.Title>
                <Button variant="primary" onClick={onAdd} className="mb-3">
                    <FiPlus /> Agregar Ciudad
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
                                {/* Otras columnas de la tabla de ciudades */}
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ciudades.map((ciudad) => (
                                <tr key={ciudad.ID}>
                                    <td>{ciudad.ID}</td>
                                    <td>{ciudad.Nombre}</td>
                                    {/* Otras celdas de la tabla de ciudades */}
                                    <td>
                                        <div className="d-flex gap-2">
                                            <Button variant="info" onClick={() => onEdit(ciudad)}>
                                                <FiEdit />
                                            </Button>
                                            <Button variant="danger" onClick={() => handleDeleteClick(ciudad)} className="ml-2">
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

export default CiudadTable;
