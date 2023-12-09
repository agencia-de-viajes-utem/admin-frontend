import React, { useState } from 'react';
import { Table, Button, Card, Modal } from 'react-bootstrap';
import { FiEdit, FiTrash2, FiPlus } from 'react-icons/fi';



const PaisTable = ({ paises, onEdit, onDelete, onAdd }) => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedPais, setSelectedPais] = useState(null);

    const handleDeleteClick = (pais) => {
        setSelectedPais(pais);
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = () => {
        onDelete(selectedPais.ID);
        setShowDeleteModal(false);
    };

    const deleteModal = (
        <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Confirmar Eliminación</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                ¿Estás seguro de que deseas borrar el país {selectedPais?.Nombre}?
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
                <Card.Title>Lista de Países</Card.Title>
                <Button variant="primary" onClick={onAdd} className="mb-3">
                    <FiPlus /> Agregar País
                </Button>
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Codigo</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paises.map((pais) => (
                            <tr key={pais.ID}>
                                <td>{pais.ID}</td>
                                <td>{pais.Nombre}</td>
                                <td>{pais.CodigoPais}</td>
                                <td>
                                    <div className="d-flex gap-2">
                                        <Button variant="info" onClick={() => onEdit(pais)}>
                                            <FiEdit />
                                        </Button>
                                        <Button variant="danger" onClick={() => handleDeleteClick(pais)} className="ml-2">
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

export default PaisTable;
