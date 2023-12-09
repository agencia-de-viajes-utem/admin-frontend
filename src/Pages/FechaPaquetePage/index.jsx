import React, { useState, useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';
import FechaPaqueteTable from '../../Components/FechaPaquete/FechaPaqueteTable';
import FechaPaqueteModal from '../../Components/FechaPaquete/FechaPaqueteModal';
import Cookies from 'js-cookie';

import { useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import { ObtenerFechasPaquete, crearFechaPaquete, actualizarFechaPaquete, eliminarFechaPaquete, ObtenerPaquetes } from '../../api/index';

const FechaPaquetePage = () => {
    const [token, setToken] = useState(Cookies.get('token'));
    const [fechasPaquete, setFechasPaquete] = useState([]);
    const [paquetes, setPaquetes] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentFechaPaquete, setCurrentFechaPaquete] = useState(null);
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate('/');
    };

    useEffect(() => {
        if (token) {
            // Obtener las fechas de paquete
            ObtenerFechasPaquete(token)
                .then((resFechasPaquete) => {
                    setFechasPaquete(resFechasPaquete);
                })
                .catch((err) => {
                    console.log('Error al obtener fechas de paquete:', err);
                });

            // Obtener los paquetes
            ObtenerPaquetes(token)
                .then((resPaquetes) => {
                    setPaquetes(resPaquetes);
                })
                .catch((err) => {
                    console.log('Error al obtener paquetes:', err);
                });

        }
    }, [token]);

    const handleShowModal = (fechaPaquete) => {
        setCurrentFechaPaquete(fechaPaquete);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setCurrentFechaPaquete(null);
    };

    const handleSaveFechaPaquete = async (fechaPaqueteData) => {
        try {
            let response;
            if (fechaPaqueteData.id) {
                // Actualizar la fecha de paquete existente
                response = await actualizarFechaPaquete(token, fechaPaqueteData);
            } else {
                // Crear una nueva fecha de paquete
                response = await crearFechaPaquete(token, fechaPaqueteData);
            }

            if (response) {
                console.log('Fecha de paquete creado/actualizado exitosamente:', response);
                window.location.reload(); // Recargar la página
            }
        } catch (error) {
            console.error('Error al guardar la fecha de paquete:', error);
        }
    };

    const handleDeleteFechaPaquete = async (fechaPaqueteId) => {
        try {
            await eliminarFechaPaquete(token, fechaPaqueteId);
            window.location.reload(); // Recargar la página
        } catch (error) {
            console.error('Error al eliminar la fecha de paquete:', error);
        }
    };

    return (
        <Container>
            <div className="d-flex justify-content-between align-items-center">
                <h1>Fechas de Paquete</h1>
                <Button variant="primary" onClick={handleGoBack}>
                    <FiArrowLeft />
                    Volver
                </Button>
            </div>
            <hr />
            <FechaPaqueteTable
                fechasPaquete={fechasPaquete}
                onEdit={handleShowModal}
                onDelete={handleDeleteFechaPaquete}
                onAdd={() => handleShowModal(null)}
            />
            <FechaPaqueteModal
                show={showModal}
                onHide={handleCloseModal}
                fechaPaquete={currentFechaPaquete}
                onSave={handleSaveFechaPaquete}
                paquetes={paquetes}
            // Puedes agregar propiedades adicionales necesarias para el modal
            />
        </Container>
    );
};

export default FechaPaquetePage;
