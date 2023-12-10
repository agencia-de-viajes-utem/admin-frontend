import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import HabitacionForm from '../../../Components/Habitacion/HabitacionDetail/HabitacionForm';
import { ObtenerTipoHabitacion, ObtenerHoteles, crearHabitacion } from '../../../api'; // Asumiendo funciones de servicio

import { Container, Button } from 'react-bootstrap';
import { FiArrowLeft } from 'react-icons/fi';

import Cookie from 'js-cookie';

function HabitacionCrearPage() {
    const { id } = useParams();
    const token = Cookie.get('token');
    const navigate = useNavigate();
    const [tipoHabitacionOptions, setTipoHabitacionOptions] = useState([]);
    const [hotelOptions, setHotelOptions] = useState([]);
    const [nuevaHabitacion, setNuevaHabitacion] = useState({
        Nombre: '',
        Descripcion: '',
        Servicios: '',
        Imagenes: '',
        PrecioNoche: 0,
        IDTipoHabitacion: '',
        IDHotel: id
    });

    useEffect(() => {
        // Cargar las opciones de tipo de habitación y hotel
        const cargarOpciones = async () => {
            const tipos = await ObtenerTipoHabitacion(token);
            const hoteles = await ObtenerHoteles(token);
            setTipoHabitacionOptions(tipos.map(tipo => ({ value: tipo.ID, label: tipo.Nombre })));
            setHotelOptions(hoteles.map(hotel => ({ value: hotel.ID, label: hotel.Nombre })));

        };

        cargarOpciones();
    }, [id]);

    const handleInputChange = (field, value) => {
        setNuevaHabitacion({ ...nuevaHabitacion, [field]: value });
    };

    const handleCrearHabitacion = async () => {
        try {
            // Realiza las conversiones necesarias para nuevaHabitacion
            const precioNocheAsNumber = parseFloat(nuevaHabitacion.PrecioNoche);
            if (isNaN(precioNocheAsNumber)) {
                throw new Error('El precio por noche no es un número válido');
            }

            const IDTipoHabitacionAsNumber = parseInt(nuevaHabitacion.IDTipoHabitacion);
            if (isNaN(IDTipoHabitacionAsNumber)) {
                throw new Error('El ID del tipo de habitación no es un número entero válido');
            }

            const IDHotelAsNumber = parseInt(nuevaHabitacion.IDHotel);
            if (isNaN(IDHotelAsNumber)) {
                throw new Error('El ID del hotel no es un número entero válido');
            }

            const serviciosArray = typeof nuevaHabitacion.Servicios === 'string'
                ? nuevaHabitacion.Servicios.split(',').map(s => s.trim())
                : nuevaHabitacion.Servicios;

            const imagenesArray = typeof nuevaHabitacion.Imagenes === 'string'
                ? nuevaHabitacion.Imagenes.split(',').map(s => s.trim())
                : nuevaHabitacion.Imagenes;

            const datosParaCrear = {
                ...nuevaHabitacion,
                PrecioNoche: precioNocheAsNumber,
                IDTipoHabitacion: IDTipoHabitacionAsNumber,
                IDHotel: IDHotelAsNumber,
                Servicios: serviciosArray,
                Imagenes: imagenesArray,
            };

            await crearHabitacion(token, datosParaCrear);
            // Redirigir a la página anterior o a la lista de habitaciones después de crear
            navigate('/habitaciones');
        } catch (error) {
            console.error('Error al crear la habitación:', error);
        }
    };

    const handleGoBack = () => {
        navigate('/habitaciones');
    };


    return (
        <Container>
            <div className="d-flex justify-content-between align-items-center">
                <h1>Crear habitación en el id_hotel {id}</h1>
                <Button variant="primary" onClick={handleGoBack}>
                    <FiArrowLeft />
                    Volver
                </Button>
            </div>
            <hr />
            <HabitacionForm
                habitacion={nuevaHabitacion}
                onInputChange={handleInputChange}
                tipoHabitacionOptions={tipoHabitacionOptions}
                modoEdicion={true}
            />
            <Button
                onClick={handleCrearHabitacion}
                className="mt-3"
            >
                Crear Habitación
            </Button>

        </Container>
        /* <HabitacionForm
                habitacion={nuevaHabitacion}
                onInputChange={handleInputChange}
                tipoHabitacionOptions={tipoHabitacionOptions}
                modoEdicion={true}
            />
            <Button onClick={handleCrearHabitacion} className="mt-3">Crear Habitación</Button> */
    );
}

export default HabitacionCrearPage;
