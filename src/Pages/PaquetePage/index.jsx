import React, { useState, useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';
import PaqueteTable from '../../Components/Paquete/PaqueteTable';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import { ObtenerPaquetes, actualizarPaquete, eliminarPaquete } from '../../api/index';

const PaquetePage = () => {
    const [token, setToken] = useState(Cookies.get('token'));
    const [paquetes, setPaquetes] = useState([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true); // Nuevo estado para indicar si los datos están cargando

    useEffect(() => {
        if (token) {
            ObtenerPaquetes(token).then((res) => {
                setPaquetes(res);
                setLoading(false);
            }).catch((err) => {
                console.error(err);
                setLoading(false);
            });
        }
    }, [token]);

    const handleGoBack = () => {
        navigate('/');
    };

    const handleShowCrearPaquete = () => {
        navigate('/paquetes/crear'); // Nueva ruta para crear paquete
    };

    const handleEditPaquete = (paquete) => {
        navigate(`/paquetes/${paquete.ID}`);
    };

    const handleDeletePaquete = async (paqueteId) => {
        try {
            await eliminarPaquete(token, paqueteId);
            console.log('Paquete eliminado exitosamente');
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
            <Button variant="primary" onClick={handleShowCrearPaquete} className='mb-4'>
                Crear Nuevo Paquete
            </Button>
            <PaqueteTable
                paquetes={paquetes}
                onEdit={handleEditPaquete}
                onDelete={handleDeletePaquete}
                loading={loading}
            />
        </Container>
    );
};

export default PaquetePage;
