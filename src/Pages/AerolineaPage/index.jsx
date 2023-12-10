import React, { useState, useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';

import AerolineaTable from '../../Components/Aerolinea/AerolineaTable';
import AerolineaModal from '../../Components/Aerolinea/AerolineaModal';

import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi';

import { ObtenerAerolineas, ObtenerAeropuertos, crearAerolinea, actualizarAerolinea, eliminarAerolinea } from '../../api/index';

const AerolineaPage = () => {
    const [token, setToken] = useState(Cookies.get('token'));
    const [aerolineas, setAerolineas] = useState([]);
    const [aeropuertos, setAeropuertos] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentAerolinea, setCurrentAerolinea] = useState(null);
    const [loading, setLoading] = useState(true); // Nuevo estado para indicar si los datos están cargando
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate('/');
    };

    useEffect(() => {
        if (token) {
            // Obtener las aerolíneas
            ObtenerAerolineas(token).then((resAerolineas) => {
                setAerolineas(resAerolineas);
                setLoading(false);
            }).catch((err) => {
                console.log('Error al obtener aerolíneas:', err);
                setLoading(false);
            });

            // Obtener los aeropuertos
            ObtenerAeropuertos(token).then((resAeropuertos) => {
                setAeropuertos(resAeropuertos);
            }).catch((err) => {
                console.log('Error al obtener aeropuertos:', err);
            });
        }
    }, [token]);

    const handleShowModal = (aerolinea) => {
        setCurrentAerolinea(aerolinea);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setCurrentAerolinea(null);
    };


    const handleSaveAerolinea = async (aerolineaData) => {
        try {
            if (aerolineaData.ID) {
                // Actualizar la aerolínea existente
                await actualizarAerolinea(token, aerolineaData);
            } else {
                // Crear una nueva aerolínea
                await crearAerolinea(token, aerolineaData);
            }
            window.location.reload(); // Recargar la página

        } catch (error) {
            console.log('Error al guardar aerolínea:', error);
        }
    };


    const handleDeleteAerolinea = async (aerolineaId) => {
        try {
            await eliminarAerolinea(token, aerolineaId);
            window.location.reload(); // Recargar la página
        } catch (error) {
            console.log('Error al eliminar aerolínea:', error);
        }
    };

    return (
        <Container>
            <div className="d-flex justify-content-between align-items-center">
                <h1>Aerolíneas</h1>
                <Button variant="primary" onClick={handleGoBack}>
                    <FiArrowLeft />
                    Volver
                </Button>
            </div>
            <hr />
            <AerolineaTable
                aerolineas={aerolineas}
                onEdit={handleShowModal}
                onDelete={handleDeleteAerolinea}
                onAdd={() => setShowModal(true)}
                loading={loading}
            />
            <AerolineaModal
                show={showModal}
                onHide={handleCloseModal}
                aerolinea={currentAerolinea}
                onSave={handleSaveAerolinea}
                allAeropuertos={aeropuertos}
            />
        </Container>
    );
};

export default AerolineaPage;
