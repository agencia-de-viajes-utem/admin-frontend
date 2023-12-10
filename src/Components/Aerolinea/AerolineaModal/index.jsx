import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Card } from 'react-bootstrap';
import Select from 'react-select';


const AerolineaModal = ({ show, onHide, aerolinea, onSave, allAeropuertos }) => {
    const [nombre, setNombre] = useState('');
    const [selectedAeropuertos, setSelectedAeropuertos] = useState([]);

    useEffect(() => {
        if (aerolinea) {
            setNombre(aerolinea.Nombre);
            setSelectedAeropuertos(aerolinea.Aeropuertos.map(a => ({ value: a.ID, label: a.Nombre })));
        } else {
            setNombre('');
            setSelectedAeropuertos([]);
        }
    }, [aerolinea]);

    const handleAeropuertoChange = (selectedOptions) => {
        setSelectedAeropuertos(selectedOptions);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSave({
            ...aerolinea,
            Nombre: nombre,
            Aeropuertos: selectedAeropuertos.map(opt => opt.value)
        });
        onHide();
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Card className="shadow">
                <Modal.Header closeButton>
                    <Modal.Title>{aerolinea ? 'Editar Aerolínea' : 'Agregar Aerolínea'}</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <Form.Label>Nombre de la Aerolínea</Form.Label>
                            <Form.Control
                                type="text"
                                required
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Aeropuertos</Form.Label>
                            <Select
                                isMulti
                                value={selectedAeropuertos}
                                onChange={handleAeropuertoChange}
                                options={allAeropuertos.map(aero => ({ value: aero.ID, label: aero.Nombre }))}
                            />
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

export default AerolineaModal;
