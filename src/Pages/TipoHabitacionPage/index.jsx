import React, { useState, useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';
import TipoHabitacionTable from '../../Components/TipoHabitacion/TipoHabitacionTable';
import TipoHabitacionModal from '../../Components/TipoHabitacion/TipoHabitacionModal';
import Cookies from 'js-cookie';

import { useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import { ObtenerTipoHabitacion, crearTipoHabitacion, actualizarTipoHabitacion, eliminarTipoHabitacion } from '../../api/index';

const TipoHabitacionPage = () => {

    const [token, setToken] = useState(Cookies.get('token'));
    const [tiposHabitacion, setTiposHabitacion] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentTipoHabitacion, setCurrentTipoHabitacion] = useState(null);
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate('/');
    };

    useEffect(() => {
        if (token) {
            // Obtener los tipos de habitación
            ObtenerTipoHabitacion(token).then((resTiposHabitacion) => {
                setTiposHabitacion(resTiposHabitacion);
            }).catch((err) => {
                console.log('Error al obtener tipos de habitación:', err);
            });
        }
    }, [token]);

    const handleShowModal = (tipoHabitacion) => {
        setCurrentTipoHabitacion(tipoHabitacion);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setCurrentTipoHabitacion(null);
    };

    const handleSaveTipoHabitacion = async (tipoHabitacionData) => {
        try {
            let response;
            if (tipoHabitacionData.ID) {
                // Actualizar el tipo de habitación existente
                response = await actualizarTipoHabitacion(token, tipoHabitacionData);
            } else {
                // Crear un nuevo tipo de habitación
                response = await crearTipoHabitacion(token, tipoHabitacionData);
            }

            if (response) {
                console.log('Tipo de habitación creado/actualizado exitosamente:', response);
                window.location.reload(); // Recargar la página
            }
        } catch (error) {
            console.error('Error al guardar el tipo de habitación:', error);
        }
    };

    const handleDeleteTipoHabitacion = async (tipoHabitacionId) => {
        try {
            await eliminarTipoHabitacion(token, tipoHabitacionId);
            window.location.reload(); // Recargar la página
        } catch (error) {
            console.error('Error al eliminar el tipo de habitación:', error);
        }
    };

    return (
        <Container>
            <div className="d-flex justify-content-between align-items-center">
                <h1>Tipos de Habitación</h1>
                <Button variant="primary" onClick={handleGoBack}>
                    <FiArrowLeft />
                    Volver
                </Button>
            </div>
            <hr />
            <TipoHabitacionTable
                tiposHabitacion={tiposHabitacion}
                onEdit={handleShowModal}
                onDelete={handleDeleteTipoHabitacion}
                onAdd={() => handleShowModal(null)}
            />
            <TipoHabitacionModal
                show={showModal}
                onHide={handleCloseModal}
                tipoHabitacion={currentTipoHabitacion}
                onSave={handleSaveTipoHabitacion}
            />
        </Container>
    );

};

export default TipoHabitacionPage;
