import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';

const ListaHabitaciones = ({ habitaciones, handleHabitacionClick, habitacionesSeleccionadas = [] }) => {
    const esHabitacionSeleccionada = (habitacionID) => {
        // Verifica si la habitación está en el array de habitaciones seleccionadas
        return habitacionesSeleccionadas.some(h => h.ID === habitacionID);
    };

    return (
        <div>
            <h3>Habitaciones:</h3>
            <Row>
                {habitaciones.map((habitacion) => (
                    <Col key={habitacion.ID} xs={12} sm={6} md={4} lg={3}>
                        <Card
                            style={{ marginBottom: '10px', cursor: 'pointer' }}
                        >
                            <Card.Body
                                style={{ height: '100%' }}
                                className={`card-habitacion ${habitacion.Ocupada ? 'card-ocupada' : ''} ${esHabitacionSeleccionada(habitacion.ID) ? 'seleccionada' : ''}`}
                                onClick={() => handleHabitacionClick(habitacion)}
                            >
                                <Card.Title className='text-center'>{habitacion.ID}</Card.Title>
                                {habitacion.Ocupada ? (
                                    <div className="text-center">
                                        <span>Ocupada</span>
                                        <span> (Paquete ID: {habitacion.IDPaquete}) </span>
                                    </div>
                                ) : (
                                    <div className="text-center">
                                        <span>Disponible</span>
                                    </div>
                                )}
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default ListaHabitaciones;
