// SeleccionarHabitacionByHotel.js
import React, { useState, useEffect } from 'react';
import { Modal, Button, Alert } from 'react-bootstrap';
import HotelList from '../../Hotel/ListaHotel';
import ListaHabitaciones from '../../Habitacion/ListaHabitaciones';

import { ObtenerHabitacionesHotel } from '../../../api/index';

import Cookies from 'js-cookie';

const SeleccionarHabitacionByHotel = ({ hoteles, show, handleClose, onUpload }) => {

    const token = Cookies.get('token');
    const [showHabitaciones, setShowHabitaciones] = useState(false);
    const [habitacionesSeleccionadas, setHabitacionesSeleccionadas] = useState([]);
    const [habitaciones, setHabitaciones] = useState([]);

    const [error, setError] = useState(null);

    useEffect(() => {
        if (show) {
            // Restablecer el estado cuando se muestra el modal
            setHabitaciones([]);
            setHabitacionesSeleccionadas([]);
            setError('');
        }
    }, [show]);

    const handleHotelClick = (hotel) => {
        const cargarHabitaciones = async () => {
            try {
                const habitacionesDelHotel = await ObtenerHabitacionesHotel(token, hotel.ID);
                if (habitacionesDelHotel.length === 0) {
                    setError('No hay habitaciones disponibles en este hotel.');
                    setShowHabitaciones(false); // Ocultar la vista de habitaciones
                } else {
                    setHabitaciones(habitacionesDelHotel);
                    setShowHabitaciones(true); // Mostrar la vista de habitaciones
                    setError(null);
                }
            } catch (error) {
                console.error('Error al cargar habitaciones:', error);
                setError('No se han encontrado habitaciones.');
            }
        };

        cargarHabitaciones();
    };

    const handleHabitacionClick = (habitacion) => {
        if (habitacion.Ocupada) {
            setError('La habitación seleccionada está ocupada.');
            return;
        }
        setError('');
        if (!habitacionesSeleccionadas.some(h => h.ID === habitacion.ID)) {
            setHabitacionesSeleccionadas([...habitacionesSeleccionadas, habitacion]);
        }
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
                {error && <Alert variant="warning">{error}</Alert>}
                {showHabitaciones && (
                    <>
                        <ListaHabitaciones
                            habitaciones={habitaciones}
                            handleHabitacionClick={handleHabitacionClick}
                            habitacionesSeleccionadas={habitacionesSeleccionadas}
                        />
                        <Button variant="primary" onClick={handleSwitchView} className="mt-3">
                            Mostrar Hoteles
                        </Button>
                    </>
                )}
                {!showHabitaciones && (
                    <>
                        <HotelList hoteles={hoteles} onHotelClick={handleHotelClick} />
                        <Button variant="primary" onClick={handleSwitchView} className="mt-3">
                            Mostrar Habitaciones
                        </Button>
                    </>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cerrar
                </Button>
                {showHabitaciones && !error && (
                    <Button variant="primary" onClick={handleSubmit}>
                        Confirmar Selección
                    </Button>
                )}
            </Modal.Footer>
        </Modal>
    );
};

export default SeleccionarHabitacionByHotel;
