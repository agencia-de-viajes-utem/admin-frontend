import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Card } from 'react-bootstrap';

const FechaPaqueteModal = ({ show, onHide, fechaPaquete, onSave, paquetes }) => {
    const [nombreFecha, setNombreFecha] = useState('');
    const [fechaInicial, setFechaInicial] = useState('');
    const [fechaFinal, setFechaFinal] = useState('');
    const [precioOferta, setPrecioOferta] = useState('');
    const [idPaquete, setIdPaquete] = useState('');

    useEffect(() => {
        if (fechaPaquete) {
            setNombreFecha(fechaPaquete.Nombre);
            setFechaInicial(fechaPaquete.FechaInicial);
            setFechaFinal(fechaPaquete.FechaFinal);
            setPrecioOferta(fechaPaquete.PrecioOferta);
            setIdPaquete(fechaPaquete.IDPaquete || '');
        } else {
            setNombreFecha('');
            setFechaInicial('');
            setFechaFinal('');
            setPrecioOferta('');
            setIdPaquete('');
        }
    }, [fechaPaquete]);

    const handleSubmit = (event) => {
        event.preventDefault();

        const paqueteActualizado = paquetes.find(paquete => paquete.ID === parseInt(idPaquete, 10));

        const fechaPaqueteActualizada = {
            ...fechaPaquete,
            Nombre: nombreFecha,
            FechaInicial: fechaInicial,
            FechaFinal: fechaFinal,
            PrecioOferta: parseFloat(precioOferta) || 0,
            IDPaquete: parseInt(idPaquete, 10) || 0,
            Paquete: paqueteActualizado || {} // Esto actualizará la información del paquete
        };

        onSave(fechaPaqueteActualizada);
        onHide();
    };

    console.log(paquetes)
    return (
        <Modal show={show} onHide={onHide} centered>
            <Card className="shadow">
                <Modal.Header closeButton>
                    <Modal.Title>{fechaPaquete ? 'Editar FechaPaquete' : 'Agregar FechaPaquete'}</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Label>Nombre de la Fecha</Form.Label>
                            <Form.Control
                                type="text"
                                required
                                value={nombreFecha}
                                onChange={(e) => setNombreFecha(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Fecha Inicial</Form.Label>
                            <Form.Control
                                type="date"
                                required
                                value={fechaInicial}
                                onChange={(e) => setFechaInicial(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Fecha Final</Form.Label>
                            <Form.Control
                                type="date"
                                required
                                value={fechaFinal}
                                onChange={(e) => setFechaFinal(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Precio de Oferta</Form.Label>
                            <Form.Control
                                type="number"
                                step="0.01"
                                required
                                value={precioOferta}
                                onChange={(e) => setPrecioOferta(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>ID del Paquete</Form.Label>
                            <Form.Control
                                as="select"
                                required
                                value={idPaquete}
                                onChange={(e) => setIdPaquete(e.target.value)}
                            >
                                <option value="">Selecciona un paquete</option>
                                {paquetes.map(paquete => (
                                    <option key={paquete.ID} value={paquete.ID}>
                                        {paquete.Nombre}
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

export default FechaPaqueteModal;
