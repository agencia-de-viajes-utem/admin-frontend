import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Card } from 'react-bootstrap';

const CiudadModal = ({ show, onHide, ciudad, onSave, paises }) => {
    const [nombreCiudad, setNombreCiudad] = useState('');
    const [idPais, setIdPais] = useState('');

    useEffect(() => {
        if (ciudad) {
            setNombreCiudad(ciudad.Nombre);
            setIdPais(ciudad.IDPais || '');
        } else {
            setNombreCiudad('');
            setIdPais('');
        }
    }, [ciudad]);

    const handleSubmit = (event) => {
        event.preventDefault();

        const paisActualizado = paises.find(pais => pais.ID === parseInt(idPais, 10));

        const ciudadActualizada = {
            ...ciudad,
            Nombre: nombreCiudad,
            IDPais: parseInt(idPais, 10) || 0,
            Pais: paisActualizado || {} // Esto actualizará la información del país
        };

        onSave(ciudadActualizada);
        onHide();
    };


    return (
        <Modal show={show} onHide={onHide} centered>
            <Card className="shadow">
                <Modal.Header closeButton>
                    <Modal.Title>{ciudad ? 'Editar Ciudad' : 'Agregar Ciudad'}</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Label>Nombre de la Ciudad</Form.Label>
                            <Form.Control
                                type="text"
                                required
                                value={nombreCiudad}
                                onChange={(e) => setNombreCiudad(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>ID del País</Form.Label>
                            <Form.Control
                                as="select"
                                required
                                value={idPais}
                                onChange={(e) => setIdPais(e.target.value)}
                            >
                                <option value="">Seleccione un país</option>
                                {paises.map(pais => (
                                    <option key={pais.ID} value={pais.ID}>
                                        {pais.Nombre}
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

export default CiudadModal;
