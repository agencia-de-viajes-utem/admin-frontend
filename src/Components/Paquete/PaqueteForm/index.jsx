import React, { useState, useEffect } from "react";
import { Form, Card, Button } from "react-bootstrap";

import HotelSelector from "./HotelSelector";

const PaqueteForm = ({
    initialValues,
    onSubmit,
    hoteles,
    aeropuertos,
    isEdit = false,
}) => {
    const [values, setValues] = useState(initialValues || {});
    // initialValues tiene:
    // ID, Nombre, Descripción, PrecioNormal,
    // HabitacionesIDs[string], Imágenes[string],
    // IDAeropuertoOrigen, IDAeropuertoDestino,

    useEffect(() => {
        setValues(initialValues || {});
    }, [initialValues]);

    const handleRemoveImage = (index) => {
        const updatedImages = [...imagenes];
        updatedImages.splice(index, 1);
        setImagenes(updatedImages);
    };

    const handleClickHabitaciones = (habitaciones) => {
        setHabitacionesSeleccionadas(habitaciones);
    };

    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const handleOpenConfirmModal = () => setShowConfirmModal(true);
    const handleCloseConfirmModal = () => setShowConfirmModal(false);

    const handleConfirmClearSelection = () => {
        setHabitacionesSeleccionadas([]);
        handleCloseConfirmModal();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(values);
    };

    console.log()

    return (
        <Card>
            <Card.Header>
                <Card.Title as="h5">
                    {isEdit ? "Editar Paquete" : "Nuevo Paquete"}
                </Card.Title>
            </Card.Header>
            <Card.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formBasicNombre">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nombre"
                            name="Nombre"
                            value={values.Nombre || ""}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicDescripcion">
                        <Form.Label>Descripción</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Descripción"
                            name="Descripcion"
                            value={values.Descripcion || ""}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicPrecioNormal">
                        <Form.Label>Precio Normal</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Precio Normal"
                            name="PrecioNormal"
                            value={values.PrecioNormal || ""}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicHabitacionesIDs">
                        <Form.Label>Habitaciones</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Habitaciones"
                            name="HabitacionesIDs"
                            value={values.HabitacionesIDs || ""}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicImagenes">
                        <Form.Label>Imágenes</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Imágenes"
                            name="Imagenes"
                            value={values.Imagenes || ""}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicIDAeropuertoOrigen">
                        <Form.Label>Aeropuerto Origen</Form.Label>
                        <Form.Control
                            as="select"
                            name="IDAeropuertoOrigen"
                            value={values.IDAeropuertoOrigen || ""}
                            onChange={handleChange}
                        >
                            <option value="">Seleccionar Aeropuerto</option>
                            {aeropuertos.map((aeropuerto) => (
                                <option key={aeropuerto.ID} value={aeropuerto.ID}>
                                    {aeropuerto.Nombre}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formBasicIDAeropuertoDestino">
                        <Form.Label>Aeropuerto Destino</Form.Label>
                        <Form.Control
                            as="select"
                            name="IDAeropuertoDestino"
                            value={values.IDAeropuertoDestino || ""}
                            onChange={handleChange}
                        >
                            <option value="">Seleccionar Aeropuerto</option>
                            {aeropuertos.map((aeropuerto) => (
                                <option key={aeropuerto.ID} value={aeropuerto.ID}>
                                    {aeropuerto.Nombre}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formBasicIDHotel">
                        <HotelSelector
                            hoteles={hoteles}
                            onHotelSelect={(hotel) => setValues({ ...values, IDHotel: hotel.ID })}
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit" className="mt-2 w-25">
                        {isEdit ? "Editar" : "Crear"}
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default PaqueteForm;
