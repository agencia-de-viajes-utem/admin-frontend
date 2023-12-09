import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';

const ListaHabitaciones = ({ habitaciones, handleHabitacionClick }) => {
    return (
        <div>
            <h3>Habitaciones:</h3>
            <Row>
                {habitaciones.map((habitacion) => (
                    <Col key={habitacion.ID} xs={12} sm={6} md={4} lg={3}>
                        <Card
                            className={`card-habitacion ${habitacion.ocupada ? 'card-ocupada' : ''}`}
                            style={{ marginBottom: '10px', cursor: 'pointer' }}
                            onClick={() => handleHabitacionClick(habitacion.ID)}
                        >
                            <Card.Body style={{ height: '100%' }}>
                                <Card.Title className='text-center'>{habitacion.ID}</Card.Title>
                                {habitacion.ocupada ? (
                                    <div className="text-center">
                                        <span>Ocupada</span>
                                        <span> (Paquete ID: {habitacion.idPaquete}) </span>
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
