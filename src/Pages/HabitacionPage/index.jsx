import React, { useState, useEffect } from 'react';
import { Container, Button, Modal, Row, Col, Card, Figure } from 'react-bootstrap';
import { ObtenerHoteles, ObtenerHabitacionesHotel, ObtenerHabitacionDetalle, actualizarHabitacion, eliminarHabitacion } from '../../api/index';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { FaHotel } from 'react-icons/fa';
import ListaHabitaciones from '../../Components/Habitacion/ListaHabitaciones';
import HotelList from '../../Components/Hotel/ListaHotel';
import './styles.css';


const HabitacionesPage = () => {
    const [token] = useState(Cookies.get('token'));
    const [hoteles, setHoteles] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentHotel, setCurrentHotel] = useState(null);
    const hotelId = currentHotel?.ID;
    const [habitaciones, setHabitaciones] = useState([]);
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate('/');
    };

    useEffect(() => {
        if (token) {
            // Obtener los hoteles
            ObtenerHoteles(token)
                .then((resHoteles) => {
                    setHoteles(resHoteles);
                })
                .catch((err) => {
                    console.log('Error al obtener hoteles:', err);
                });
        }
    }, [token]);

    const handleShowModal = async (hotel) => {
        try {
            const response = await ObtenerHabitacionesHotel(token, hotel.ID);
            // console.log(response);
            setHabitaciones(response || []);
            setCurrentHotel(hotel);
            setShowModal(true);
        } catch (error) {
            console.log('Error al obtener habitaciones del hotel:', error);
        }
    };


    const handleCloseModal = () => {
        setShowModal(false);
        setCurrentHotel(null);
        setHabitaciones([]);
    };

    const handleHabitacionClick = async (habitacionID) => {
        navigate(`/habitaciones/${habitacionID}`);
    };

    const handleAgregarHabitacionClick = () => {
        navigate(`/habitaciones/hotel/${hotelId}`);
    };


    return (
        <Container>
            <div className="d-flex justify-content-between align-items-center">
                <h1>Habitaciones</h1>
                <Button variant="primary" onClick={handleGoBack}>
                    <FiArrowLeft />
                    Volver
                </Button>
            </div>
            <hr />
            <div className="container mt-3" >
                <div className="row">
                    <div className="col shadow-sm p-3 mb-5 bg-white rounded">
                        <HotelList hoteles={hoteles} onHotelClick={handleShowModal} />
                    </div>
                </div>
            </div>

            <Modal show={showModal} onHide={handleCloseModal} className='modal fade modal-lg'>
                <Modal.Header closeButton>
                    <Modal.Title>{currentHotel?.Nombre}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Button
                        variant="primary"
                        onClick={handleAgregarHabitacionClick}
                        className="mb-3"
                    >
                        Agregar Habitación
                    </Button>

                    {habitaciones.length > 0 ? (
                        < ListaHabitaciones habitaciones={habitaciones} handleHabitacionClick={handleHabitacionClick}></ListaHabitaciones>

                    ) : (
                        <div>No hay habitaciones, haga click en el botón para crear.</div>
                    )}
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default HabitacionesPage;
