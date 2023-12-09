import React, { useState, useEffect } from 'react';
import { Card, Form } from 'react-bootstrap';

function HabitacionForm({
    habitacion,
    onInputChange,
    tipoHabitacionOptions,
    hotelOptions,
    modoEdicion,
}) {

    return (


        < Card className="my-4" >
            <Card.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Nombre:</Form.Label>
                        <Form.Control
                            type="text"
                            value={habitacion.Nombre || ''}
                            onChange={(e) => onInputChange('Nombre', e.target.value)}
                            disabled={!modoEdicion}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Descripción:</Form.Label>
                        <Form.Control
                            as="textarea"
                            value={habitacion.Descripcion || ''}
                            onChange={(e) => onInputChange('Descripcion', e.target.value)}
                            disabled={!modoEdicion}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Servicios:</Form.Label>
                        <Form.Control
                            type="text"
                            value={habitacion.Servicios || ''}
                            onChange={(e) => onInputChange('Servicios', e.target.value)}
                            disabled={!modoEdicion}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Imagenes:</Form.Label>
                        <Form.Control
                            type="text"
                            value={habitacion.Imagenes || ''}
                            onChange={(e) => onInputChange('Imagenes', e.target.value)}
                            disabled={!modoEdicion}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Precio por noche:</Form.Label>
                        <Form.Control
                            type="number"
                            value={habitacion.PrecioNoche || ''}
                            onChange={(e) => onInputChange('PrecioNoche', e.target.value)}
                            disabled={!modoEdicion}
                        />
                    </Form.Group>

                    {/* A partir de tipoHabitacionOptions hacer un select */}
                    <Form.Group>
                        <Form.Label>Tipo de Habitación:</Form.Label>
                        <Form.Select
                            value={habitacion.IDTipoHabitacion || ''}
                            onChange={(e) => onInputChange('IDTipoHabitacion', e.target.value)}
                            disabled={!modoEdicion}
                        >
                            {tipoHabitacionOptions.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    {/* A partir de hotelOptions hacer un select */}

                    {hotelOptions && hotelOptions.length > 0 && (
                        <Form.Group>
                            <Form.Label>Hotel:</Form.Label>
                            <Form.Select
                                value={habitacion.IDHotel || ''}
                                onChange={(e) => onInputChange('IDHotel', e.target.value)}
                                disabled={!modoEdicion}
                            >
                                {hotelOptions.map(option => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    )}
                </Form>
            </Card.Body>
        </Card >
    );
}

export default HabitacionForm;
