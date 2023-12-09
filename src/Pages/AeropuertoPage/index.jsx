import React, { useState, useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';
import AeropuertoTable from '../../Components/Aeropuerto/AeropuertoTable';
import AeropuertoModal from '../../Components/Aeropuerto/AeropuertoModal';
import Cookies from 'js-cookie';

import { useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import { ObtenerAeropuertos, crearAeropuerto, actualizarAeropuerto, eliminarAeropuerto, ObtenerCiudades } from '../../api/index';

const AeropuertoPage = () => {

    const [token, setToken] = useState(Cookies.get('token'));
    const [aeropuertos, setAeropuertos] = useState([]);
    const [ciudades, setCiudades] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentAeropuerto, setCurrentAeropuerto] = useState(null);
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate('/');
    };

    useEffect(() => {
        if (token) {
            // Obtener los aeropuertos
            ObtenerAeropuertos(token).then((resAeropuertos) => {
                setAeropuertos(resAeropuertos);
            }).catch((err) => {
                console.log('Error al obtener aeropuertos:', err);
            });

            // Obtener las ciudades
            ObtenerCiudades(token).then((resCiudades) => {
                setCiudades(resCiudades);
            }).catch((err) => {
                console.log('Error al obtener ciudades:', err);
            });
        }
    }, [token]);

    const handleShowModal = (aeropuerto) => {
        setCurrentAeropuerto(aeropuerto);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setCurrentAeropuerto(null);
    };

    const handleSaveAeropuerto = async (aeropuertoData) => {
        try {
            let response;
            if (aeropuertoData.ID) {
                // Actualizar el país existente
                response = await actualizarAeropuerto(token, aeropuertoData);
            } else {
                // Crear un nuevo país
                response = await crearAeropuerto(token, aeropuertoData);
            }
            if (response) {
                console.log('Aeropuerto guardado correctamente');
                window.location.reload(); // Recargar la página
            }
        } catch (error) {
            console.log('Error al guardar aeropuerto:', error);
        }
    };

    const handleDeleteAeropuerto = async (aeropuertoId) => {
        try {
            await eliminarAeropuerto(token, aeropuertoId);
            window.location.reload(); // Recargar la página
        } catch (error) {
            console.log('Error al eliminar aeropuerto:', error);
        }
    };

    return (
        <Container>
            <div className="d-flex justify-content-between align-items-center">
                <h1>Aeropuertos</h1>
                <Button variant="primary" onClick={handleGoBack}>
                    <FiArrowLeft />
                    Volver
                </Button>
            </div>
            <hr />
            <AeropuertoTable
                aeropuertos={aeropuertos}
                onEdit={handleShowModal}
                onDelete={handleDeleteAeropuerto}
                onAdd={() => setShowModal(true)}
            />
            <AeropuertoModal
                show={showModal}
                onHide={handleCloseModal}
                aeropuerto={currentAeropuerto}
                onSave={handleSaveAeropuerto}
                ciudades={ciudades}
            />


        </Container>
    );

};

export default AeropuertoPage;