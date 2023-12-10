// CrearPaquetePage.js
import React, { useState, useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import PaqueteForm from '../../../Components/Paquete/PaqueteForm';
import Cookie from 'js-cookie';

import { ObtenerAeropuertos, crearPaquete, ObtenerHoteles, SubirImagenPaquete } from '../../../api/index';

const CrearPaquetePage = () => {
    const navigate = useNavigate();
    const token = Cookie.get('token');

    const [aeropuertosOptions, setAeropuertosOptions] = useState([]);
    const [hoteles, setHoteles] = useState([]);
    const [selectedImages, setSelectedImages] = useState([]);

    useEffect(() => {
        ObtenerAeropuertos().then(setAeropuertosOptions).catch(console.error);
        ObtenerHoteles().then(setHoteles).catch(console.error);
    }, []);

    const handleSubirImagenes = async (imagenesArray) => {
        const imagenesSubidas = [];
        for (const imagen of imagenesArray) {
            const formData = new FormData();
            formData.append('file', imagen, imagen.name);
            try {
                const res = await SubirImagenPaquete(token, formData);
                imagenesSubidas.push(res.url); // Suponiendo que res.url contiene la URL de la imagen subida
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
        const imagenesSubidas = await handleSubirImagenes(selectedImages);
        const newFormData = {
            Nombre: formData.Nombre,
            Descripcion: formData.Descripcion,
            PrecioNormal: formData.PrecioNormal,
            Imagenes: imagenesSubidas,
            IDAeropuertoOrigen: formData.IDAeropuertoOrigen,
            IDAeropuertoDestino: formData.IDAeropuertoDestino,
            HabitacionIDs: formData.Habitaciones
        };

        try {
            await crearPaquete(token, newFormData);
            navigate('/paquetes');
        } catch (err) {
            console.error('Error al crear el paquete:', err);
        }
    };

    return (
        <Container>
            <Button variant="primary" onClick={() => navigate('/paquetes')} className='my-4'>
                Volver a la Lista de Paquetes
            </Button>
            <PaqueteForm
                onSubmit={handleFormSubmit}
                onImageSelect={handleImageSelect}
                initialValues={{}}
                aeropuertosOptions={aeropuertosOptions}
                hoteles={hoteles}
            />
        </Container>
    );
};

export default CrearPaquetePage;
