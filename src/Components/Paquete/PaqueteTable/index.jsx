import React, { useState } from 'react';
import { Table, Button, Card, Modal, Spinner } from 'react-bootstrap';
import { FiEdit, FiTrash2 } from 'react-icons/fi';

const PaqueteTable = ({ paquetes, onEdit, onDelete, loading }) => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedPaquete, setSelectedPaquete] = useState(null);

    const handleDeleteClick = (paquete) => {
        setSelectedPaquete(paquete);
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = () => {
        onDelete(selectedPaquete.ID);
        setShowDeleteModal(false);
    };

    const deleteModal = (
        <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Confirmar Eliminación</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                ¿Estás seguro de que deseas borrar el paquete {selectedPaquete?.Nombre}?
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
                <Card.Title>Lista de Paquetes</Card.Title>
                {loading ? (
                    <div className="text-center">
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Cargando...</span>
                        </Spinner>
                    </div>
                ) : (
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Descripción</th>
                                <th>Precio Normal</th>
                                <th>Imágenes</th>
                                <th>Origen</th>
                                <th>Destino</th>
                                <th>Hotel</th>
                                <th> Habitaciones </th>
                                <th> Capacidad Total</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paquetes.map((paquete) => (
                                <tr key={paquete.ID}>
                                    <td>{paquete.ID}</td>
                                    <td>{paquete.Nombre}</td>
                                    <td>{paquete.Descripcion}</td>
                                    <td>{paquete.PrecioNormal}</td>
                                    <td>
                                        <ul>
                                            {paquete.Imagenes.map((imagen, index) => (
                                                <li key={index}>
                                                    <img src={imagen} alt={`Imagen ${index}`} />
                                                </li>
                                            ))}
                                        </ul>                                    </td>
                                    <td>{paquete.Origen.Nombre}</td>
                                    <td>{paquete.Destino.Nombre}</td>
                                    <td>{paquete?.Hotel?.Nombre || 'No especificado'}</td>
                                    <td>
                                        {paquete.Habitaciones ?
                                            paquete.Habitaciones.map(habitacion => habitacion.ID).join(', ') :
                                            'No especificado'}
                                    </td>
                                    <td>
                                        {paquete.Habitaciones ?
                                            paquete.Habitaciones.reduce((total, habitacion) => total + habitacion.TipoHabitacion.Capacidad, 0) :
                                            0}
                                    </td>
                                    <td>
                                        <div className="d-flex gap-2">
                                            <Button variant="info" onClick={() => onEdit(paquete)}>
                                                <FiEdit />
                                            </Button>
                                            <Button variant="danger" onClick={() => handleDeleteClick(paquete)} className="ml-2">
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

export default PaqueteTable;
