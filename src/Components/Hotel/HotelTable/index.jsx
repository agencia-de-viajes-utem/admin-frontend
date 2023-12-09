import React, { useState } from 'react';
import { Table, Button, Card, Modal } from 'react-bootstrap';
import { FiEdit, FiTrash2, FiPlus } from 'react-icons/fi';

const HotelTable = ({ hoteles, ciudades, onEdit, onDelete, onAdd }) => {
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

    if (hoteles.length === 0) {
        return (
            <Card className="shadow-sm p-3 mb-5 bg-white rounded">
                {deleteModal}
                <Card.Body>
                    <Card.Title>Lista de Hoteles</Card.Title>
                    <Button variant="primary" onClick={onAdd} className="mb-3">
                        <FiPlus /> Agregar Hotel
                    </Button>
                    <p>No hay hoteles disponibles.</p>
                </Card.Body>
            </Card>
        );
    }

    return (
        <Card className="shadow-sm p-3 mb-5 bg-white rounded">
            {deleteModal}
            <Card.Body>
                <Card.Title>Lista de Hoteles</Card.Title>
                <Button variant="primary" onClick={onAdd} className="mb-3">
                    <FiPlus /> Agregar Hotel
                </Button>
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Descripción</th>
                            <th>Dirección</th>
                            <th>Servicios</th>
                            <th>Email</th>
                            <th>Teléfono</th>
                            <th>Sitio Web</th>
                            <th>Imágenes</th>
                            <th>Ciudad</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {hoteles.map((hotel) => (
                            <tr key={hotel.ID}>
                                <td>{hotel.ID}</td>
                                <td>{hotel.Nombre}</td>
                                <td>{hotel.Descripcion}</td>
                                <td>{hotel.Direccion}</td>
                                <td>{hotel.Servicios.join(', ')}</td>
                                <td>{hotel.Email}</td>
                                <td>{hotel.Telefono}</td>
                                <td>{hotel.SitioWeb}</td>
                                <td>
                                    <ul>
                                        {hotel.Imagenes.map((imagen, index) => (
                                            <li key={index}>
                                                <img src={imagen} alt={`Imagen ${index}`} />
                                            </li>
                                        ))}
                                    </ul>
                                </td>
                                <td>{ciudades.find((ciudad) => ciudad.ID === hotel.CiudadID)?.Nombre}</td>
                                <td>
                                    <div className="d-flex gap-2">
                                        <Button variant="info" onClick={() => onEdit(hotel)}>
                                            <FiEdit />
                                        </Button>
                                        <Button variant="danger" onClick={() => handleDeleteClick(hotel)}>
                                            <FiTrash2 />
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Card.Body>
        </Card>
    );
};

export default HotelTable;
