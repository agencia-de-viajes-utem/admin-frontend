import React, { useState, useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';
import PaisTable from '../../Components/Pais/PaisTable';
import PaisModal from '../../Components/Pais/PaisModal';
import Cookies from 'js-cookie';

import { useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import { ObtenerPaises, crearPais, actualizarPais, eliminarPais } from '../../api/index';


const PaisPage = () => {
    const [token, setToken] = useState(Cookies.get('token'));
    const [paises, setPaises] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentPais, setCurrentPais] = useState(null);
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate('/');
    };

    useEffect(() => {
        if (token) {
            ObtenerPaises(token).then((res) => {
                setPaises(res);
            }).catch((err) => {
                console.log(err);
            });
        }
    }, []);

    const handleShowModal = (pais) => {
        setCurrentPais(pais);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setCurrentPais(null);
    };

    const handleSavePais = async (paisData) => {
        try {
            let response;
            if (paisData.ID) {
                // Actualizar el país existente
                response = await actualizarPais(token, paisData);
            } else {
                // Crear un nuevo país
                response = await crearPais(token, paisData);
            }

            if (response) {
                console.log('País creado/actualizado exitosamente:', response);
                window.location.reload(); // Recargar la página
            }
        } catch (error) {
            console.error('Error al guardar el país:', error);
        } finally {
            // Cerrar el modal y limpiar el estado de currentPais después de guardar
            handleCloseModal();
        }
    };

    const handleDeletePais = async (paisId) => {
        try {
            await eliminarPais(token, paisId);
            console.log('País eliminado exitosamente');

            // Actualizar la lista de países después de la eliminación
            const updatedPaises = paises.filter(pais => pais.ID !== paisId);
            setPaises(updatedPaises);
        } catch (error) {
            console.error('Error al eliminar el país:', error);
        }
    };

    return (
        <Container>
            <div className="d-flex justify-content-between align-items-center">
                <h1>Países</h1>
                <Button variant="primary" onClick={handleGoBack}>
                    <FiArrowLeft />
                    Volver
                </Button>
            </div>
            <hr />
            <PaisTable paises={paises} onEdit={handleShowModal} onDelete={handleDeletePais} onAdd={() => handleShowModal(null)} />
            <PaisModal show={showModal} onHide={handleCloseModal} pais={currentPais} onSave={handleSavePais} />
        </Container>
    );
};

export default PaisPage;
