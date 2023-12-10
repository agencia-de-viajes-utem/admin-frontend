import React, { useState } from 'react';
import { Table, Button, Card, Modal, Spinner } from 'react-bootstrap';
import { FiEdit, FiTrash2, FiPlus } from 'react-icons/fi';

const AerolineaTable = ({ aerolineas, onEdit, onDelete, onAdd, loading }) => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedAerolinea, setSelectedAerolinea] = useState(null);

    const handleDeleteClick = (aerolinea) => {
        setSelectedAerolinea(aerolinea);
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = () => {
        onDelete(selectedAerolinea.ID);
        setShowDeleteModal(false);
    };

    const deleteModal = (
        <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Confirmar Eliminación</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                ¿Estás seguro de que deseas borrar la aerolínea {selectedAerolinea?.Nombre}?
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
                <Card.Title>Lista de Aerolíneas</Card.Title>
                <Button variant="primary" onClick={onAdd} className="mb-3">
                    <FiPlus /> Agregar Aerolínea
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
                                {/* Otras columnas de la tabla de aerolíneas */}
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {aerolineas.map((aerolinea) => (
                                <tr key={aerolinea.ID}>
                                    <td>{aerolinea.ID}</td>
                                    <td>{aerolinea.Nombre}</td>
                                    {/* Otras celdas de la tabla de aerolíneas */}
                                    <td>
                                        <div className="d-flex gap-2">
                                            <Button variant="info" onClick={() => onEdit(aerolinea)}>
                                                <FiEdit />
                                            </Button>
                                            <Button variant="danger" onClick={() => handleDeleteClick(aerolinea)} className="ml-2">
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

export default AerolineaTable;
