// PaqueteForm.js
import React, { useState, useEffect } from 'react';
import { Button, Form, Card } from 'react-bootstrap';
import Select from 'react-select';

import CargarImagenesModal from '../../CargarImagenesModal';

const PaqueteForm = ({ onSubmit, initialValues, aeropuertosOptions }) => {
    const [nombre, setNombre] = useState(initialValues.Nombre || '');
    const [descripcion, setDescripcion] = useState(initialValues.Descripcion || '');
    const [precioNormal, setPrecioNormal] = useState(initialValues.PrecioNormal || 0);
    const [imagenes, setImagenes] = useState(initialValues.Imagenes || []);
    const [aeropuertoOrigen, setAeropuertoOrigen] = useState(initialValues.IDAeropuertoOrigen || '');
    const [aeropuertoDestino, setAeropuertoDestino] = useState(initialValues.IDAeropuertoDestino || '');

    const [showModal, setShowModal] = useState(false);

    const handleUploadImages = (files, fileNames) => {
        console.log(files, fileNames)
        // Actualiza el estado de 'imagenes' con los nombres de los archivos de las imágenes
        setImagenes(fileNames);
        setShowModal(false); // Cierra el modal después de la carga
    };


    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit({
            Nombre: nombre,
            Descripcion: descripcion,
            PrecioNormal: parseFloat(precioNormal),
            Imagenes: imagenes,
            IDAeropuertoOrigen: aeropuertoOrigen,
            IDAeropuertoDestino: aeropuertoDestino,
        });
    };



    const aeropuertosFiltrados = aeropuertosOptions.filter(
        aeropuerto => aeropuerto.ID !== aeropuertoOrigen && aeropuerto.ID !== aeropuertoDestino
    );

    return (
        <Card className="shadow my-4">
            <Card.Body>
                <Card.Title>{'Crear Nuevo Paquete'}</Card.Title>
                <Form onSubmit={handleSubmit}>
                    {/* Campos del formulario */}
                    <Form.Group className="mb-3">
                        <Form.Label>Nombre del Paquete</Form.Label>
                        <Form.Control
                            type="text"
                            required
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Descripción del Paquete</Form.Label>
                        <Form.Control
                            as="textarea"
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Precio Normal</Form.Label>
                        <Form.Control
                            type="number"
                            step="0.01"
                            required
                            value={precioNormal}
                            onChange={(e) => setPrecioNormal(e.target.value)}
                        />
                    </Form.Group>
                    {/* Campo para las imágenes */}
                    <Form.Group className="mb-3">
                        <Form.Label>Imágenes</Form.Label>
                        <Form.Control
                            type="text"
                            value={imagenes.join(', ')}
                            readOnly // Hacer que el campo de texto sea solo lectura
                            className="mb-3"
                        />
                        <Button variant="secondary" onClick={() => setShowModal(true)}>
                            Subir Imágenes
                        </Button>
                    </Form.Group>
                    <CargarImagenesModal
                        show={showModal}
                        handleClose={() => setShowModal(false)}
                        onUpload={handleUploadImages}

                    />
                    <Form.Group className="mb-3">
                        <Form.Label>Aeropuerto de Origen</Form.Label>
                        <Select
                            options={aeropuertosFiltrados}
                            getOptionLabel={(option) => option.Nombre}
                            getOptionValue={(option) => option.ID}
                            onChange={(selectedOption) => setAeropuertoOrigen(selectedOption.ID)}
                            value={aeropuertosOptions.find(option => option.ID === aeropuertoOrigen)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Aeropuerto de Destino</Form.Label>
                        <Select
                            options={aeropuertosFiltrados}
                            getOptionLabel={(option) => option.Nombre}
                            getOptionValue={(option) => option.ID}
                            onChange={(selectedOption) => setAeropuertoDestino(selectedOption.ID)}
                            value={aeropuertosOptions.find(option => option.ID === aeropuertoDestino)}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Crear Paquete
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default PaqueteForm;
