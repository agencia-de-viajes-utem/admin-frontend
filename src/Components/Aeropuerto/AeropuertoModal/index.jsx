import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Card } from 'react-bootstrap';

const AeropuertoModal = ({ show, onHide, aeropuerto, onSave, ciudades }) => {
    const [nombre, setNombre] = useState('');
    const [idCiudad, setIdCiudad] = useState('');

    useEffect(() => {
        if (aeropuerto) {
            setNombre(aeropuerto.Nombre);
            setIdCiudad(aeropuerto.IDCiudad || '');
        } else {
            setNombre('');
            setIdCiudad('');
        }
    }, [aeropuerto]);

    const handleSubmit = (event) => {
        event.preventDefault();

        const ciudadActualizada = ciudades.find(ciudad => ciudad.ID === parseInt(idCiudad, 10));

        const aeropuertoActualizado = {
            ...aeropuerto,
            Nombre: nombre,
            IDCiudad: parseInt(idCiudad, 10) || 0,
            Ciudad: ciudadActualizada || {} // Esto actualizará la información de la ciudad
        };

        onSave(aeropuertoActualizado);
        onHide();
    };


    return (
        <Modal show={show} onHide={onHide} centered>
            <Card className="shadow">
                <Modal.Header closeButton>
                    <Modal.Title>{aeropuerto ? 'Editar Aeropuerto' : 'Agregar Aeropuerto'}</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Label>Nombre del Aeropuerto</Form.Label>
                            <Form.Control
                                type="text"
                                required
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Ciudad</Form.Label>
                            <Form.Control
                                as="select"
                                required
                                value={idCiudad}
                                onChange={(e) => {
                                    setIdCiudad(e.target.value);
                                }}
                            >
                                <option value="">Seleccione una ciudad</option>
                                {ciudades.map(ciudad => (
                                    <option key={ciudad.ID} value={ciudad.ID}>
                                        {ciudad.Nombre}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={onHide}>Cancelar</Button>
                        <Button variant="primary" type="submit">Guardar</Button>
                    </Modal.Footer>
                </Form>
            </Card>
        </Modal>
    );
};

export default AeropuertoModal;
