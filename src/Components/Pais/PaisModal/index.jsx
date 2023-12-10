import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Card } from 'react-bootstrap';

const PaisModal = ({ show, onHide, pais, onSave }) => {
    const [nombrePais, setNombrePais] = useState('');
    const [codigoPais, setCodigoPais] = useState(''); // Estado para el código del país

    useEffect(() => {
        if (pais) {
            setNombrePais(pais.Nombre);
            setCodigoPais(pais.CodigoPais || ''); // Ajuste para manejar pais.codigo_pais
        } else {
            setNombrePais('');
            setCodigoPais('');
        }
    }, [pais]);

    const handleSubmit = (event) => {
        event.preventDefault();
        onSave({ ...pais, Nombre: nombrePais, CodigoPais: codigoPais }); // Incluir codigo_pais en el objeto
        onHide();
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Card className="shadow">
                <Modal.Header closeButton>
                    <Modal.Title>{pais ? 'Editar País' : 'Agregar País'}</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Label>Nombre del País</Form.Label>
                            <Form.Control
                                type="text"
                                required
                                value={nombrePais}
                                onChange={(e) => setNombrePais(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Código del País</Form.Label>
                            <Form.Control
                                type="text"
                                required
                                value={codigoPais}
                                onChange={(e) => setCodigoPais(e.target.value)}
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={onHide}>
                            Cancelar
                        </Button>
                        <Button variant="primary" type="submit">
                            {pais ? 'Actualizar' : 'Agregar'}
                        </Button>
                    </Modal.Footer>
                </Form>
            </Card>
        </Modal>
    );
};

export default PaisModal;
