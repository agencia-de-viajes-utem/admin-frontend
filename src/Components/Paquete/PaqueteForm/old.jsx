import React, { useState, useEffect } from 'react';
import { Button, Form, Card, Modal } from 'react-bootstrap';
import Select from 'react-select';

import CargarImagenesModal from '../../CargarImagenesModal';
import SeleccionarHabitacionByHotel from '../SeleccionarHabitacionByHotel';

const PaqueteForm1 = ({ onImageSelect, onSubmit, initialValues, aeropuertosOptions, hoteles, isEdit = false }) => {
    // Estado para los campos del formulario
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [precioNormal, setPrecioNormal] = useState(0);
    const [imagenes, setImagenes] = useState([]);
    const [aeropuertoOrigen, setAeropuertoOrigen] = useState('');
    const [aeropuertoDestino, setAeropuertoDestino] = useState('');

    // Estado para los modales
    const [showModal, setShowModal] = useState(false);
    const [showModalHabitaciones, setShowModalHabitaciones] = useState(false);

    // Estado para las habitaciones seleccionadas
    const [habitacionesSeleccionadas, setHabitacionesSeleccionadas] = useState([]);

    useEffect(() => {
        if (isEdit) {
            // Cargar datos iniciales en modo de edición
            setNombre(initialValues.Nombre || '');
            setDescripcion(initialValues.Descripcion || '');
            setPrecioNormal(initialValues.PrecioNormal || 0);
            setHabitacionesSeleccionadas(initialValues.Habitaciones || []);

            // Inicializar imagenes
            setImagenes(initialValues.Imagenes.map(imagen => ({
                name: imagen,
                url: `${imagen}`,
                file: null
            })));

            // Inicializar select de aeropuertos
            if (initialValues.Origen) {
                const origenSeleccionado = aeropuertosOptions.find(a => a.ID === initialValues.Origen.ID);
                setAeropuertoOrigen(origenSeleccionado || '');
            }

            if (initialValues.Destino) {
                const destinoSeleccionado = aeropuertosOptions.find(a => a.ID === initialValues.Destino.ID);
                setAeropuertoDestino(destinoSeleccionado || '');
            }
        }
    }, [isEdit, initialValues, aeropuertosOptions]);


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

    const handleSubmit = async (event) => {
        event.preventDefault();

        // En modo de edición, no todos los campos son obligatorios
        if (!isEdit && !(nombre && precioNormal && aeropuertoOrigen && aeropuertoDestino && habitacionesSeleccionadas.length > 0) || (isEdit && habitacionesSeleccionadas.length === 0)) {
            alert('Por favor, complete todos los campos');
            return;
        }

        const imagenesNuevas = imagenes.filter(img => img.file);
        const nombresImagenesExistentes = imagenes.filter(img => !img.file).map(img => img.name);

        let imagenesSubidas = [];
        if (imagenesNuevas.length > 0) {
            imagenesSubidas = await handleSubirImagenes(imagenesNuevas.map(img => img.file));
        }

        const imagenesTotales = [...nombresImagenesExistentes, ...imagenesSubidas];

        if (onSubmit) {
            onSubmit({
                Nombre: nombre,
                Descripcion: descripcion || 'No hay descripción',
                PrecioNormal: parseFloat(precioNormal) || 0,
                Imagenes: imagenesTotales || [],
                IDAeropuertoOrigen: aeropuertoOrigen?.ID || '',
                IDAeropuertoDestino: aeropuertoDestino?.ID || '',
                Habitaciones: habitacionesSeleccionadas.map(h => h.ID),
                ToUpload: imagenes,
            });
        }
    };

    return (
        <Card className="shadow my-4">
            <Card.Body>
                <Card.Title>{isEdit ? 'Editar Paquete' : 'Crear Nuevo Paquete'}</Card.Title>
                <Form onSubmit={handleSubmit}>
                    {/* Campos del formulario */}
                    {/* Nombre del Paquete */}
                    <Form.Group className="mb-3">
                        <Form.Label>Nombre del Paquete</Form.Label>
                        <Form.Control
                            type="text"
                            required
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                        />
                    </Form.Group>
                    {/* Fin Nombre del Paquete */}

                    {/* Descripción del Paquete */}
                    <Form.Group className="mb-3">
                        <Form.Label>Descripción del Paquete</Form.Label>
                        <Form.Control
                            as="textarea"
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                        />
                    </Form.Group>
                    {/* Fin Descripción del Paquete */}

                    {/* Precio Normal */}
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
                    {/* Fin Precio Normal */}

                    {/* Campos para las habitaciones */}
                    {/* Campo para las habitaciones */}
                    <Form.Group className="mb-3">
                        <Form.Label>Habitaciones</Form.Label>
                        <Form.Control
                            type="text"
                            value={habitacionesSeleccionadas.map(h => `${h.ID} - ${h.Nombre}`).join(', ')}
                            readOnly // Hacer que el campo de texto sea solo lectura
                            className="mb-3"
                        />
                        <div className="d-flex">
                            <Button
                                className='flex-grow-1 me-2'
                                variant="outline-primary"
                                onClick={() => setShowModalHabitaciones(true)}>
                                Seleccionar Hotel
                            </Button>
                            <Button
                                variant="outline-danger"
                                onClick={handleOpenConfirmModal}>
                                Limpiar Selección
                            </Button>
                        </div>
                    </Form.Group>
                    {/* Modal de Confirmación */}
                    <Modal show={showConfirmModal} onHide={handleCloseConfirmModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Confirmar Acción</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            Está seguro que desea limpiar la selección? Este es un paso que no se puede deshacer y eliminará la relación de su paquete y las habitaciones enlazadas.
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseConfirmModal}>
                                Cancelar
                            </Button>
                            <Button variant="danger" onClick={handleConfirmClearSelection}>
                                Confirmar
                            </Button>
                        </Modal.Footer>
                    </Modal>

                    <SeleccionarHabitacionByHotel
                        show={showModalHabitaciones}
                        handleClose={() => setShowModalHabitaciones(false)}
                        onUpload={handleClickHabitaciones}
                        hoteles={hoteles}
                    />
                    {/* Fin para las habitaciones */}

                    {/* Campo para las imágenes */}
                    <Form.Group className="mb-3">
                        <Form.Label>Imágenes</Form.Label>
                        <div className=' p-2'>
                            {imagenes.map((imagen, index) => (
                                <div key={index} className="d-flex align-items-center mb-2 justify-content-between">
                                    <img
                                        className='shadow-sm border rounded'
                                        src={imagen.url}
                                        alt={imagen.name}
                                        style={{ width: '50px', height: '50px' }}
                                    />
                                    <div>{imagen.name}</div>
                                    <Button variant="danger" size="sm" onClick={() => handleRemoveImage(index)}>
                                        Eliminar
                                    </Button>
                                </div>
                            ))}
                        </div>
                        <Button className='w-100 text-start' variant="outline-primary" onClick={() => setShowModal(true)}>
                            Subir Imágenes
                        </Button>
                    </Form.Group>

                    {/* Modal para subir imágenes */}
                    <CargarImagenesModal
                        show={showModal}
                        handleClose={() => setShowModal(false)}
                        onSelect={onImageSelect}
                    />
                    {/* Fin para las imágenes */}

                    {/* Campos para los aeropuertos */}
                    <Form.Group className="mb-3">
                        <Form.Label>Aeropuerto de Origen</Form.Label>
                        <Select
                            options={aeropuertosOptions}
                            getOptionLabel={(option) => option.Nombre}
                            getOptionValue={(option) => option.ID}
                            onChange={(selectedOption) => setAeropuertoOrigen(selectedOption)}
                            value={aeropuertoOrigen}
                        />
                    </Form.Group>
                    {/* Fin para Aeropuerto Origen */}
                    {/* Campo para Aeropuerto Destino */}
                    <Form.Group className="mb-3">
                        <Form.Label>Aeropuerto de Destino</Form.Label>
                        <Select
                            options={aeropuertosOptions}
                            getOptionLabel={(option) => option.Nombre}
                            getOptionValue={(option) => option.ID}
                            onChange={(selectedOption) => setAeropuertoDestino(selectedOption)}
                            value={aeropuertoDestino}
                        />
                    </Form.Group>
                    {/* Fin para Aeropuerto Destino */}
                    {/* Fin para los aeropuertos */}
                    {/* Fin Campos del formulario */}
                    <hr />
                    <Button variant="primary" type="submit">
                        {isEdit ? 'Actualizar Paquete' : 'Crear Paquete'}
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default PaqueteForm1;
