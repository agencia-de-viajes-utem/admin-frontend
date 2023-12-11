import React, { useState } from 'react';
import { Table, Button, Card, Modal, Spinner } from 'react-bootstrap';
import { FiEdit, FiTrash2, FiPlus } from 'react-icons/fi';

const HotelTable = ({ hoteles, onEdit, onDelete, onAdd, loading }) => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedHotel, setSelectedHotel] = useState(null);

    const handleDeleteClick = (hotel) => {
        setSelectedHotel(hotel);
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = () => {
        onDelete(selectedHotel.ID);
        setShowDeleteModal(false);
    };

    const deleteModal = (
        <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Confirmar Eliminación</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                ¿Estás seguro de que deseas borrar el hotel {selectedHotel?.Nombre}?
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
                <Card.Title>Lista de Hoteles</Card.Title>
                <Button variant="primary" onClick={onAdd} className="mb-3">
                    <FiPlus /> Agregar Hotel
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
                                <th>Dirección</th>
                                <th>Ciudad</th>
                                <th>País</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {hoteles.map((hotel) => (
                                <tr key={hotel.ID}>
                                    <td>{hotel.ID}</td>
                                    <td>{hotel.Nombre}</td>
                                    <td>{hotel.Direccion}</td>
                                    <td>{hotel.Ciudad.Nombre}</td>
                                    <td>{hotel.Ciudad.Pais.Nombre}</td>
                                    <td>
                                        <div className="d-flex gap-2">
                                            <Button variant="info" onClick={() => onEdit(hotel)}>
                                                <FiEdit />
                                            </Button>
                                            <Button variant="danger" onClick={() => handleDeleteClick(hotel)} className="ml-2">
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

export default HotelTable;
