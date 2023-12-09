import React, { useState, useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';

import HotelTable from '../../Components/Hotel/HotelTable';
import HotelModal from '../../Components/Hotel/HotelModal';

import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi';

import { ObtenerHoteles, ObtenerCiudades, crearHotel, actualizarHotel, eliminarHotel } from '../../api/index';

const HotelPage = () => {
    const [token, setToken] = useState(Cookies.get('token'));
    const [hoteles, setHoteles] = useState([]);
    const [ciudades, setCiudades] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentHotel, setCurrentHotel] = useState(null);
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate('/');
    };

    useEffect(() => {
        if (token) {
            // Obtener los hoteles
            ObtenerHoteles(token).then((resHoteles) => {
                setHoteles(resHoteles);
            }).catch((err) => {
                console.log('Error al obtener hoteles:', err);
            });

            // Obtener las ciudades
            ObtenerCiudades(token).then((resCiudades) => {
                setCiudades(resCiudades);
            }).catch((err) => {
                console.log('Error al obtener ciudades:', err);
            });
        }
    }, [token]);

    const handleShowModal = (hotel) => {
        setCurrentHotel(hotel);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setCurrentHotel(null);
    };

    const handleSaveHotel = async (hotelData) => {
        console.log(hotelData);
        try {
            if (hotelData.ID) {
                // Actualizar el hotel existente
                await actualizarHotel(token, hotelData);
            } else {
                // Crear un nuevo hotel
                await crearHotel(token, hotelData);
            }
            window.location.reload(); // Recargar la página

        } catch (error) {
            console.log('Error al guardar hotel:', error);
        }
    };

    const handleDeleteHotel = async (hotelId) => {
        try {
            await eliminarHotel(token, hotelId);
            window.location.reload(); // Recargar la página
        } catch (error) {
            console.log('Error al eliminar hotel:', error);
        }
    };

    return (
        <Container>
            <div className="d-flex justify-content-between align-items-center">
                <h1>Hoteles</h1>
                <Button variant="primary" onClick={handleGoBack}>
                    <FiArrowLeft />
                    Volver
                </Button>
            </div>
            <hr />
            <HotelTable
                hoteles={hoteles}
                ciudades={ciudades}
                onEdit={handleShowModal}
                onDelete={handleDeleteHotel}
                onAdd={() => setShowModal(true)}
            />
            <HotelModal
                show={showModal}
                onHide={handleCloseModal}
                hotel={currentHotel}
                onSave={handleSaveHotel}
                ciudades={ciudades}
            />
        </Container>
    );
};

export default HotelPage;
