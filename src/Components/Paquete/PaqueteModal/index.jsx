import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Card } from 'react-bootstrap';

const PaqueteModal = ({ show, onHide, paquete, onSave, aeropuertos }) => {
    const [nombrePaquete, setNombrePaquete] = useState('');
    const [descripcionPaquete, setDescripcionPaquete] = useState('');
    const [precioNormal, setPrecioNormal] = useState(0);
    const [imagenes, setImagenes] = useState([]);
    const [aeropuertoOrigen, setAeropuertoOrigen] = useState('');
    const [aeropuertoDestino, setAeropuertoDestino] = useState('');
    const [idAeropuerto, setIdAeropuerto] = useState('');

    useEffect(() => {
        if (paquete) {
            setNombrePaquete(paquete.Nombre);
            setDescripcionPaquete(paquete.Descripcion || '');
            setPrecioNormal(paquete.PrecioNormal || 0.0);
            setImagenes(paquete.Imagenes || []);
            setAeropuertoOrigen(paquete.IDAeropuertoOrigen || '');
            setAeropuertoDestino(paquete.IDAeropuertoDestino || '');
        } else {
            setNombrePaquete('');
            setDescripcionPaquete('');
            setPrecioNormal(0.0);
            setImagenes([]);
            setAeropuertoOrigen('');
            setAeropuertoDestino('');
        }
    }, [paquete]);

    const handleSubmit = (event) => {
        event.preventDefault();

        //const aeropuertoActualizado = aeropuertos.find(aeropuerto => aeropuerto.ID === parseInt(idAeropuerto, 10));

        onSave({
            ...paquete,
            Nombre: nombrePaquete,
            Descripcion: descripcionPaquete,
            PrecioNormal: parseFloat(precioNormal),
            Imagenes: imagenes,
            IDAeropuertoOrigen: aeropuertoOrigen,
            IDAeropuertoDestino: aeropuertoDestino,
            Aeropuerto: aeropuertoActualizado || {} // Esto actualizará la información del aeropuerto
        });
        onHide();
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Card className="shadow">
                <Modal.Header closeButton>
                    <Modal.Title>{paquete ? 'Editar Paquete' : 'Agregar Paquete'}</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Label>Nombre del Paquete</Form.Label>
                            <Form.Control
                                type="text"
                                required
                                value={nombrePaquete}
                                onChange={(e) => setNombrePaquete(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Descripción del Paquete</Form.Label>
                            <Form.Control
                                type="text"
                                value={descripcionPaquete}
                                onChange={(e) => setDescripcionPaquete(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Precio Normal del Paquete</Form.Label>
                            <Form.Control
                                type="number"
                                step="0.01" // Permitir decimales
                                required
                                value={precioNormal}
                                onChange={(e) => setPrecioNormal(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Imágenes del Paquete</Form.Label>
                            <Form.Control
                                type="text"
                                value={imagenes.join(', ')} // Cambiado a un arreglo para el campo de imágenes
                                onChange={(e) => setImagenes(e.target.value.split(', '))}
                            />
                        </Form.Group>
                        {/* <Form.Group>
                            <Form.Label>ID del Aeropuerto</Form.Label>
                            <Form.Control
                                as="select"
                                required
                                value={idAeropuerto}
                                onChange={(e) => setIdAeropuerto(e.target.value)}
                            >
                                <option value="">Seleccione un aeropuerto</option>
                                {aeropuertos.map(aeropuerto => (
                                    <option key={aeropuerto.ID} value={aeropuerto.ID}>
                                        {aeropuerto.Nombre}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group> */}
                        {/* Add more Form.Group components for other fields as needed */}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={onHide}>
                            Cancelar
                        </Button>
                        <Button variant="primary" type="submit">
                            {paquete ? 'Actualizar' : 'Agregar'}
                        </Button>
                    </Modal.Footer>
                </Form>
            </Card>
        </Modal>
    );
};

export default PaqueteModal;
