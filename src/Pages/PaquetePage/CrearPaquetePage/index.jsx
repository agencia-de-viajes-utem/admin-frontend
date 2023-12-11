// CrearPaquetePage.js
import React, { useState, useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import PaqueteForm from '../../../Components/Paquete/PaqueteForm/index.jsx';
import Cookie from 'js-cookie';

import { ObtenerAeropuertos, crearPaquete, ObtenerHoteles, SubirImagenPaquete } from '../../../api/index';

const CrearPaquetePage = () => {
    const navigate = useNavigate();
    const token = Cookie.get('token');

    const [aeropuertosOptions, setAeropuertosOptions] = useState([]);
    const [hoteles, setHoteles] = useState([]);
    const [habitaciones, setHabitaciones] = useState([]);

    useEffect(() => {
        ObtenerAeropuertos().then(setAeropuertosOptions).catch(console.error);
        ObtenerHoteles().then(setHoteles).catch(console.error);
    }, []);


    const handleSubirImagenes = async (formDatas) => {
        const imagenesSubidas = [];
        for (const formData of formDatas) {
            try {
                const res = await SubirImagenPaquete(token, formData);
                imagenesSubidas.push(res.url);
            } catch (err) {
                console.error('Error al subir imagen:', err);
            }
        }
        return imagenesSubidas;
    };

    const handleFormSubmit = async (formData) => {
        const imagenesFinales = await handleSubirImagenes(formData.ImagesFormData);

        const newFormData = {
            Nombre: formData.Nombre,
            Descripcion: formData.Descripcion,
            PrecioNormal: parseFloat(formData.PrecioNormal),
            Imagenes: imagenesFinales,
            IDAeropuertoOrigen: formData.IDAeropuertoOrigen,
            IDAeropuertoDestino: formData.IDAeropuertoDestino,
            HabitacionIDs: formData.HabitacionIDs,
        };
        try {
            await crearPaquete(token, newFormData);
            navigate('/paquetes');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Container>
            <Button variant="primary" onClick={() => navigate('/paquetes')} className='my-4'>
                Volver a la Lista de Paquetes
            </Button>
            <PaqueteForm
                onSubmit={handleFormSubmit}
                hoteles={hoteles}
                aeropuertos={aeropuertosOptions}

            />
        </Container>
    );
};

export default CrearPaquetePage;
