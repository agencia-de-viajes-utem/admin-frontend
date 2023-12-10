// EditarPaquetePage.js
import React, { useEffect, useState } from 'react';
import { Container, Button, Alert } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import PaqueteForm from '../../../Components/Paquete/PaqueteForm';
import Cookie from 'js-cookie';

import { ObtenerAeropuertos, actualizarPaquete, ObtenerHoteles, SubirImagenPaquete, ObtenerPaquetePorID, eliminarRelacionesPaquete } from '../../../api/index';

const EditarPaquetePage = () => {
    const navigate = useNavigate();
    const token = Cookie.get('token');
    const { paqueteId } = useParams();
    const [aeropuertosOptions, setAeropuertosOptions] = useState([]);
    const [hoteles, setHoteles] = useState([]);
    const [paquete, setPaquete] = useState(null);
    const [selectedImages, setSelectedImages] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchDatos = async () => {
            try {
                const aeropuertos = await ObtenerAeropuertos();
                const hoteles = await ObtenerHoteles();
                const paquete = await ObtenerPaquetePorID(token, paqueteId);

                setAeropuertosOptions(aeropuertos);
                setHoteles(hoteles);
                setPaquete(paquete);
            } catch (err) {
                console.error(err);
                setError('Error al cargar los datos.');
            }
        };

        fetchDatos();
    }, [paqueteId, token]);

    const handleSubirImagenes = async (imagenesParaSubir) => {
        const imagenesSubidas = [];
        for (const imagen of imagenesParaSubir) {
            const formData = new FormData();
            formData.append('file', imagen, imagen.name);
            try {
                const res = await SubirImagenPaquete(token, formData);
                imagenesSubidas.push(res.url);
            } catch (err) {
                console.error('Error al subir imagen:', err);
            }
        }
        return imagenesSubidas;
    };

    const handleImageSelect = (imagenes) => {
        setSelectedImages(imagenes);
    };

    const handleFormSubmit = async (formData) => {
        const imagenesFinales = await handleSubirImagenes(selectedImages);
        const newFormData = {
            ID: parseInt(paqueteId),
            Nombre: formData.Nombre,
            Descripcion: formData.Descripcion,
            PrecioNormal: formData.PrecioNormal,
            Imagenes: imagenesFinales,
            IDAeropuertoOrigen: formData.IDAeropuertoOrigen,
            IDAeropuertoDestino: formData.IDAeropuertoDestino,
            HabitacionIDs: formData.Habitaciones
        };

        try {
            await actualizarPaquete(token, newFormData);
            navigate('/paquetes');
        } catch (err) {
            console.error('Error al actualizar el paquete:', err);
            setError('No se ha podido actualizar el paquete.');
        }
    };

    const handleConfirmClearSelection = async () => {
        console.log(paqueteId)
        try {
            // Llamada a la función para eliminar relaciones paquetes_habitaciones
            await eliminarRelacionesPaquete(token, paqueteId);
        } catch (error) {
            console.error('Error al eliminar las relaciones paquetes_habitaciones:', error.message);
            // Puedes manejar el error según tus necesidades (por ejemplo, mostrar un mensaje de error)
        }
    };

    return (
        <Container>
            <Button variant="primary" onClick={() => navigate('/paquetes')} className='my-4'>
                Volver a la Lista de Paquetes
            </Button>
            {paquete ? (
                <PaqueteForm
                    onSubmit={handleFormSubmit}
                    onImageSelect={handleImageSelect}
                    initialValues={paquete}
                    aeropuertosOptions={aeropuertosOptions}
                    hoteles={hoteles}
                    isEdit={true}
                    onClearSelection={handleConfirmClearSelection}
                />
            ) : (
                <Alert variant="info">Cargando datos del paquete...</Alert>
            )}
            {error && <Alert variant="warning">{error}</Alert>}
        </Container>
    );
};

export default EditarPaquetePage;
