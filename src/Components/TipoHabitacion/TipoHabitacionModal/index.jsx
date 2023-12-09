import React from 'react';
import { Modal, Button, Form, Card } from 'react-bootstrap';

const TipoHabitacionModal = ({ show, onHide, tipoHabitacion, onSave }) => {
    const [nombreTipoHabitacion, setNombreTipoHabitacion] = React.useState('');
    const [capacidadTipoHabitacion, setCapacidadTipoHabitacion] = React.useState('');

    React.useEffect(() => {
        if (tipoHabitacion) {
            setNombreTipoHabitacion(tipoHabitacion.Nombre);
            setCapacidadTipoHabitacion(tipoHabitacion.Capacidad.toString());
        } else {
            setNombreTipoHabitacion('');
            setCapacidadTipoHabitacion('');
        }
    }, [tipoHabitacion]);

    const handleSubmit = (event) => {
        event.preventDefault();

        const tipoHabitacionActualizado = {
            ...tipoHabitacion,
            Nombre: nombreTipoHabitacion,
            Capacidad: parseInt(capacidadTipoHabitacion),
        };

        onSave(tipoHabitacionActualizado);
        onHide();
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Card className="shadow">
                <Modal.Header closeButton>
                    <Modal.Title>{tipoHabitacion ? 'Editar Tipo de Habitación' : 'Agregar Tipo de Habitación'}</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Label>Nombre del Tipo de Habitación</Form.Label>
                            <Form.Control
                                type="text"
                                required
                                value={nombreTipoHabitacion}
                                onChange={(e) => setNombreTipoHabitacion(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Capacidad</Form.Label>
                            <Form.Control
                                type="number"
                                required
                                value={capacidadTipoHabitacion}
                                onChange={(e) => setCapacidadTipoHabitacion(e.target.value)}
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

export default TipoHabitacionModal;
