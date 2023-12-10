// SeleccionarHabitacionByHotel.js
import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import HotelList from './HotelList';
import ListaHabitaciones from './ListaHabitaciones';

const SeleccionarHabitacionByHotel = ({ hoteles, show, handleClose, onUpload }) => {
    const [showHabitaciones, setShowHabitaciones] = useState(false);
    const [habitacionesSeleccionadas, setHabitacionesSeleccionadas] = useState([]);

    const handleHotelClick = (hotel) => {
        // Aquí puedes cargar las habitaciones del hotel seleccionado
        const cargarHabitaciones = async () => {
            const habitacionesDelHotel = await ObtenerHabitacionesHotel(hotel.ID);
            setHabitaciones(habitacionesDelHotel);
        };

        cargarHabitaciones();
        setShowHabitaciones(true);
    };

    const handleHabitacionClick = (habitacionID) => {
        // Aquí puedes manejar la lógica de selección de habitaciones
        setHabitacionesSeleccionadas([...habitacionesSeleccionadas, habitacionID]);
    };

    const handleSwitchView = () => {
        setShowHabitaciones(!showHabitaciones);
    };

    const handleSubmit = () => {
        // Aquí puedes manejar la lógica de submit con las habitaciones seleccionadas
        onUpload(habitacionesSeleccionadas);
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Seleccionar Hotel y Habitaciones</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {showHabitaciones ? (
                    <ListaHabitaciones
                        habitaciones={habitaciones}
                        handleHabitacionClick={handleHabitacionClick}
                    />
                ) : (
                    <HotelList hoteles={hoteles} onHotelClick={handleHotelClick} />
                )}

                <Button variant="primary" onClick={handleSwitchView} className="mt-3">
                    {showHabitaciones ? 'Mostrar Hoteles' : 'Mostrar Habitaciones'}
                </Button>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cerrar
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Confirmar Selección
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default SeleccionarHabitacionByHotel;
