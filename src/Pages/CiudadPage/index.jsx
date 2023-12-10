import React, { useState, useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';
import CiudadTable from '../../Components/Ciudad/CiudadTable';
import CiudadModal from '../../Components/Ciudad/CiudadModal';
import Cookies from 'js-cookie';

import { useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import { ObtenerCiudades, crearCiudad, actualizarCiudad, eliminarCiudad, ObtenerPaises } from '../../api/index';

const CiudadPage = () => {

    const [token, setToken] = useState(Cookies.get('token'));
    const [ciudades, setCiudades] = useState([]);
    const [paises, setPaises] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentCiudad, setCurrentCiudad] = useState(null);
    const [loading, setLoading] = useState(true); // Nuevo estado para indicar si los datos están cargando
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate('/');
    };

    useEffect(() => {
        if (token) {
            // Obtener las ciudades
            ObtenerCiudades(token).then((resCiudades) => {
                setCiudades(resCiudades);
                setLoading(false);
            }).catch((err) => {
                console.log('Error al obtener ciudades:', err);
                setLoading(false);
            });

            // Obtener los países
            ObtenerPaises(token).then((resPaises) => {
                setPaises(resPaises);
                setLoading(false);
            }).catch((err) => {
                console.log('Error al obtener países:', err);
                setLoading(false);
            });
        }
    }, [token]);

    const handleShowModal = (ciudad) => {
        setCurrentCiudad(ciudad);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setCurrentCiudad(null);
    };

    const handleSaveCiudad = async (ciudadData) => {
        try {
            let response;
            if (ciudadData.ID) {
                // Actualizar el país existente
                response = await actualizarCiudad(token, ciudadData);
            } else {
                // Crear un nuevo país
                response = await crearCiudad(token, ciudadData);
            }

            if (response) {
                console.log('Ciudad creado/actualizado exitosamente:', response);
                window.location.reload(); // Recargar la página
            }
        } catch (error) {
            console.error('Error al guardar la ciudad:', error);
        }
    };

    const handleDeleteCiudad = async (ciudadId) => {
        try {
            await eliminarCiudad(token, ciudadId);
            window.location.reload(); // Recargar la página
        } catch (error) {
            console.error('Error al eliminar la ciudad:', error);
        }
    };

    return (
        <Container>
            <div className="d-flex justify-content-between align-items-center">
                <h1>Ciudades</h1>
                <Button variant="primary" onClick={handleGoBack}>
                    <FiArrowLeft />
                    Volver
                </Button>
            </div>
            <hr />
            <CiudadTable
                ciudades={ciudades}
                onEdit={handleShowModal}
                onDelete={handleDeleteCiudad}
                onAdd={() => handleShowModal(null)}
                loading={loading}
            />
            <CiudadModal
                show={showModal}
                onHide={handleCloseModal}
                ciudad={currentCiudad}
                onSave={handleSaveCiudad}
                paises={paises} />
        </Container>
    );

};

export default CiudadPage;

