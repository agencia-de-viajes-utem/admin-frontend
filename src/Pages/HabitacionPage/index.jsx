import React, { useState, useEffect } from 'react';
import { Container, Button, Modal, Row, Col, Card, Figure } from 'react-bootstrap';
import { ObtenerHoteles, ObtenerHabitacionesHotel, ObtenerHabitacionDetalle, actualizarHabitacion, eliminarHabitacion } from '../../api/index';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { FaHotel } from 'react-icons/fa';

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
                        <h2>Lista de Hoteles</h2>
                        <div className="d-flex flex-wrap" >
                            {hoteles.map((hotel) => (
                                <div key={hotel.ID} role='button' className="d-flex align-items-center border rounded m-2 p-2 btn btn-outline-secondary" onClick={() => handleShowModal(hotel)}>
                                    <FaHotel size={30} className="me-2" />
                                    <div>
                                        <div><strong>ID:</strong> {hotel.ID}</div>
                                        <div><strong>Nombre:</strong> {hotel.Nombre}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
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
                        <>
                            <h3>Habitaciones:</h3>
                            <Row>
                                {habitaciones.map((habitacion) => (
                                    <Col key={habitacion.ID} xs={12} sm={6} md={4} lg={3}>
                                        <Card
                                            className={`card-habitacion ${habitacion.ocupada ? 'card-ocupada' : ''}`}
                                            style={{ marginBottom: '10px', cursor: 'pointer' }}
                                            onClick={() => handleHabitacionClick(habitacion.ID)}
                                        >
                                            <Card.Body>
                                                <Card.Title className='text-center'>{habitacion.ID}</Card.Title>
                                                <Card.Text>
                                                    {habitacion.ocupada ? (
                                                        <>
                                                            <div className="text-center">
                                                                <span>Ocupada</span>
                                                                <p> (Paquete ID: {habitacion.idPaquete})</p>
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <div className="text-center">
                                                            <span>Disponible</span>
                                                        </div>
                                                    )}
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        </>
                    ) : (
                        <p>No hay habitaciones, haga click en el botón para crear.</p>
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
