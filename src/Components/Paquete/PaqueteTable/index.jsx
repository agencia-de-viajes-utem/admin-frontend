import React, { useState } from 'react';
import { Table, Button, Card, Modal, Spinner, Alert } from 'react-bootstrap';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { FaExclamationTriangle } from 'react-icons/fa';

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
                <p>¿Estás seguro de que deseas borrar el paquete {selectedPaquete?.Nombre}?</p>
                <Alert variant="danger">
                    <p> Esta acción eliminará todas las relaciones del paquete con las habitaciones y no se puede deshacer. </p>
                </Alert>
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
                                        <div className='p-2 d-flex flex-column gap-4 my-auto mx-auto'>
                                            {paquete.Imagenes.map((imagen, index) => (
                                                <div
                                                    key={index}
                                                    className="d-flex align-items-center mb-2 justify-content-between flex-column"
                                                >
                                                    <div className="me-2 position-relative">
                                                        <img
                                                            className='shadow-sm border rounded'
                                                            src={`${imagen}`}
                                                            alt={`Imagen del paquete ${paquete.ID}-${index}`}
                                                            style={{ width: '50px', height: '50px' }}
                                                            onError={(e) => {
                                                                e.target.style.display = 'none';
                                                                e.target.nextSibling.style.display = 'block';
                                                            }}
                                                        />
                                                        <FaExclamationTriangle
                                                            className="position-absolute top-50 start-50 translate-middle"
                                                            style={{ display: 'none', fontSize: '2rem', color: 'red' }} // Icono oculto por defecto
                                                        /> {/* Icono de advertencia */}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </td>


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
