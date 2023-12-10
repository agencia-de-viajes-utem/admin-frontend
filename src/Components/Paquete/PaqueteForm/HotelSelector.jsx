import React, { useState, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import Cookies from 'js-cookie';
import ListaHabitaciones from '../../../Components/Habitacion/ListaHabitaciones';
import HotelList from '../../../Components/Hotel/ListaHotel';
import { ObtenerHabitacionesHotel } from '../../../api/index';

const ModalHotelList = ({
    hoteles,
    handleCloseModal,
    showModal,
    currentHotel,
    habitaciones,
    handleHotelClick,
    handleHabitacionClick,
    habitacionesSeleccionadas,
    handleCambiarHotel,
}) => {
    return (
        <Modal show={showModal} onHide={handleCloseModal} size='lg'>
            <Modal.Header closeButton>
                <Modal.Title>
                    {currentHotel ? `Habitaciones en ${currentHotel.Nombre}` : 'Seleccionar Hotel'}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ maxHeight: '600px', overflowY: 'auto' }}>
                {currentHotel ? (
                    <>
                        {habitaciones !== null && habitaciones.length > 0 ? (
                            <ListaHabitaciones
                                habitaciones={habitaciones}
                                handleHabitacionClick={handleHabitacionClick}
                                habitacionesSeleccionadas={habitacionesSeleccionadas}
                            />
                        ) : (
                            <p>No hay habitaciones disponibles en este hotel.</p>
                        )}
                        <Button
                            variant='secondary'
                            onClick={() => {
                                handleCloseModal(); // Cerrar modal de hotel
                            }}
                        >
                            Confirmar
                        </Button>
                        <Button
                            variant='primary'
                            onClick={() => {
                                handleCambiarHotel(); // Llamar a la función para cambiar el hotel
                            }}
                        >
                            Cambiar Hotel
                        </Button>
                    </>
                ) : (
                    <>
                        <HotelList
                            hoteles={hoteles}
                            onHotelClick={handleHotelClick}
                            className='modal-hotel-list'
                        />
                    </>
                )}
            </Modal.Body>
        </Modal>

    );
};

const HotelSelector = ({ hoteles }) => {
    const [token] = useState(Cookies.get('token'));
    const [showModal, setShowModal] = useState(false);
    const [currentHotel, setCurrentHotel] = useState(null);
    const [habitaciones, setHabitaciones] = useState([]);
    const [habitacionesSeleccionadas, setHabitacionesSeleccionadas] = useState([]);

    const handleHotelClick = (hotel) => {
        setCurrentHotel(hotel);
    };

    const handleCambiarHotel = () => {
        setCurrentHotel(null);
        setHabitaciones([]);
        setHabitacionesSeleccionadas([]);
    };

    useEffect(() => {
        if (currentHotel) {
            // Obtener las habitaciones del hotel
            ObtenerHabitacionesHotel(token, currentHotel.ID)
                .then((resHabitaciones) => {
                    setHabitaciones(resHabitaciones);
                })
                .catch((err) => {
                    console.log('Error al obtener habitaciones del hotel:', err);
                });
        }
    }, [currentHotel]);

    const handleHabitacionClick = (habitacion) => {
        if (!habitacion.Ocupada) {
            const index = habitacionesSeleccionadas.findIndex((h) => h.ID === habitacion.ID);
            if (index === -1) {
                setHabitacionesSeleccionadas([...habitacionesSeleccionadas, habitacion]);
            } else {
                const newHabitacionesSeleccionadas = [...habitacionesSeleccionadas];
                newHabitacionesSeleccionadas.splice(index, 1);
                setHabitacionesSeleccionadas(newHabitacionesSeleccionadas);
            }
        }
    };

    const handleShowModal = () => {
        setShowModal(true);
    };

    return (
        <>
            <Form.Group controlId='formBasicHotel'>
                <Form.Label>Hotel</Form.Label>
                <Button
                    variant='outline-primary'
                    onClick={handleShowModal}
                    className='w-100 text-start'
                >
                    {currentHotel
                        ? `${currentHotel.Nombre}, ${currentHotel.Direccion}, ${currentHotel.Ciudad.Nombre}, ${currentHotel.Ciudad.Pais.Nombre}`
                        : 'Seleccionar Hotel'}
                </Button>
            </Form.Group>
            <ModalHotelList
                hoteles={hoteles}
                handleCloseModal={() => setShowModal(false)}
                showModal={showModal}
                currentHotel={currentHotel}
                habitaciones={habitaciones}
                handleHotelClick={handleHotelClick}
                handleHabitacionClick={handleHabitacionClick}
                habitacionesSeleccionadas={habitacionesSeleccionadas}
                handleCambiarHotel={handleCambiarHotel}
            />
            <div className='d-flex flex-column'>
                <span>Habitaciones</span>
                {habitacionesSeleccionadas.length > 0 ? (
                    <div className="d-flex">
                        {habitacionesSeleccionadas.map((habitacion) => (
                            <div key={habitacion.ID} className='card m-2'>
                                <div className='card-body'>
                                    <h5 className='card-title'>{habitacion.Nombre}</h5>
                                    <p className='card-text'>
                                        <strong>ID:</strong> {habitacion.ID}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="btn btn-outline-primary text-start mt-2">
                        No ha seleccionado habitaciones aún
                    </div>
                )}
            </div>

        </>

    );
};

export default HotelSelector;
