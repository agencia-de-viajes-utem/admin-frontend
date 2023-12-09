import React, { useState, useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';
import PaqueteTable from '../../Components/Paquete/PaqueteTable';
import PaqueteModal from '../../Components/Paquete/PaqueteModal';
import Cookies from 'js-cookie';

import { useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import { ObtenerPaquetes, crearPaquete, actualizarPaquete, eliminarPaquete } from '../../api/index';

const PaquetePage = () => {
    const [token, setToken] = useState(Cookies.get('token'));
    const [paquetes, setPaquetes] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentPaquete, setCurrentPaquete] = useState(null);
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate('/');
    };

    useEffect(() => {
        if (token) {
            ObtenerPaquetes(token).then((res) => {
                setPaquetes(res);
            }).catch((err) => {
                console.error(err);
            });
        }
    }, [token]);

    const handleShowModal = (paquete) => {
        setCurrentPaquete(paquete);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setCurrentPaquete(null);
    };

    const handleSavePaquete = async (paqueteData) => {
        try {
            let response;
            if (paqueteData.ID) {
                // Actualizar el paquete existente
                response = await actualizarPaquete(token, paqueteData);
            } else {
                // Crear un nuevo paquete
                response = await crearPaquete(token, paqueteData);
            }

            if (response) {
                console.log('Paquete creado/actualizado exitosamente:', response);
                window.location.reload(); // Recargar la página
            }
        } catch (error) {
            console.error('Error al guardar el paquete:', error);
        } finally {
            // Cerrar el modal y limpiar el estado de currentPaquete después de guardar
            handleCloseModal();
        }
    };

    const handleDeletePaquete = async (paqueteId) => {
        try {
            await eliminarPaquete(token, paqueteId);
            console.log('Paquete eliminado exitosamente');

            // Actualizar la lista de paquetes después de la eliminación
            const updatedPaquetes = paquetes.filter(paquete => paquete.ID !== paqueteId);
            setPaquetes(updatedPaquetes);
        } catch (error) {
            console.error('Error al eliminar el paquete:', error);
        }
    };

    return (
        <Container>
            <div className="d-flex justify-content-between align-items-center">
                <h1>Paquetes</h1>
                <Button variant="primary" onClick={handleGoBack}>
                    <FiArrowLeft />
                    Volver
                </Button>
            </div>
            <hr />
            <PaqueteTable paquetes={paquetes} onEdit={handleShowModal} onDelete={handleDeletePaquete} onAdd={() => handleShowModal(null)} />
            <PaqueteModal show={showModal} onHide={handleCloseModal} paquete={currentPaquete} onSave={handleSavePaquete} />
        </Container>
    );
};

export default PaquetePage;
