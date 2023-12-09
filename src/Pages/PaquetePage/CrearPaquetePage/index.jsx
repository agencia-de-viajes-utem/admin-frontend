// CrearPaquetePage.js
import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import PaqueteForm from '../../../Components/Paquete/PaqueteForm';
import Cookie from 'js-cookie';

import { ObtenerAeropuertos, crearPaquete } from '../../../api/index';

const CrearPaquetePage = () => {
    const navigate = useNavigate();
    const token = Cookie.get('token');

    const [aeropuertosOptions, setAeropuertosOptions] = React.useState([]);

    React.useEffect(() => {
        ObtenerAeropuertos().then((res) => {
            setAeropuertosOptions(res);
        }).catch((err) => {
            console.error(err);
        });
    }, []);

    const handleFormSubmit = (formData) => {
        console.log(formData);
        crearPaquete(token, formData).then((res) => {
            console.log('Paquete creado exitosamente');
            navigate('/paquetes');
        }).catch((err) => {
            console.error(err);
        });

    };

    return (
        <Container>
            <Button variant="primary" onClick={() => navigate('/paquetes')} className='my-4'>
                Volver a la Lista de Paquetes
            </Button>
            <PaqueteForm onSubmit={handleFormSubmit} initialValues={{}} aeropuertosOptions={aeropuertosOptions} />
        </Container>
    );
};

export default CrearPaquetePage;
