import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ObtenerHabitacionDetalle, ObtenerTipoHabitacion, ObtenerHoteles, actualizarHabitacion, eliminarHabitacion } from '../../../api/index';
import { Container } from 'react-bootstrap';
import Cookie from 'js-cookie';
import HabitacionDetail from '../../../Components/Habitacion/HabitacionDetail';

const HabitacionDetallePage = () => {
    const token = Cookie.get('token');
    const { id } = useParams();
    const [habitacionDetalle, setHabitacionDetalle] = useState(null);
    const [tipoHabitacionOptions, setTipoHabitacionOptions] = useState([]);
    const [hotelOptions, setHotelOptions] = useState([]);
    const navigate = useNavigate();
    const [modoEdicion, setModoEdicion] = useState(false);

    useEffect(() => {
        const cargarDatos = async () => {
            try {
                const detalle = await ObtenerHabitacionDetalle(token, id);
                setHabitacionDetalle(detalle);

                const tipos = await ObtenerTipoHabitacion(token);
                setTipoHabitacionOptions(tipos.map(tipo => ({ value: tipo.ID, label: tipo.Nombre })));

                const hoteles = await ObtenerHoteles(token);
                setHotelOptions(hoteles.map(hotel => ({ value: hotel.ID, label: hotel.Nombre })));
            } catch (error) {
                console.error('Error al cargar datos:', error);
            }
        };

        cargarDatos();
    }, [token, id]);

    const handleActualizarHabitacion = () => {
        setModoEdicion(true);
    };

    const handleCancelarEdicion = () => {
        setModoEdicion(false);
    };

    const handleGuardarCambios = async (updatedData) => {
        try {
            const idAsNumber = parseInt(id);
            if (isNaN(idAsNumber)) {
                throw new Error('El ID no es un número entero válido');
            }

            const precioNocheAsNumber = parseFloat(updatedData.PrecioNoche);
            if (isNaN(precioNocheAsNumber)) {
                throw new Error('El precio por noche no es un número válido');
            }

            const IDTipoHabitacionAsNumber = parseInt(updatedData.IDTipoHabitacion);
            if (isNaN(IDTipoHabitacionAsNumber)) {
                throw new Error('El ID del tipo de habitación no es un número entero válido');
            }

            const IDHotelAsNumber = parseInt(updatedData.IDHotel);
            if (isNaN(IDHotelAsNumber)) {
                throw new Error('El ID del hotel no es un número entero válido');
            }

            // Convierte Servicios a un array solo si es una cadena
            const serviciosArray = typeof updatedData.Servicios === 'string'
                ? updatedData.Servicios.split(',').map(s => s.trim())
                : updatedData.Servicios;

            // Similar para Imagenes
            const imagenesArray = typeof updatedData.Imagenes === 'string'
                ? updatedData.Imagenes.split(',').map(s => s.trim())
                : updatedData.Imagenes;

            const datosActualizados = {
                ID: idAsNumber,
                Nombre: updatedData.Nombre,
                Descripcion: updatedData.Descripcion,
                Servicios: serviciosArray,
                PrecioNoche: precioNocheAsNumber,
                Imagenes: imagenesArray,
                IDTipoHabitacion: IDTipoHabitacionAsNumber,
                IDHotel: IDHotelAsNumber,
            };

            const updatedHabitacion = await actualizarHabitacion(token, datosActualizados);
            setModoEdicion(false);
            window.location.reload();
        } catch (error) {
            console.error('Error al actualizar la habitación:', error);
        }
    };


    const handleBorrarHabitacion = async () => {
        try {
            await eliminarHabitacion(token, id);
            console.log('Habitación eliminada');
            navigate('/habitaciones');
        } catch (error) {
            console.error('Error al eliminar la habitación:', error);
        }
    };

    const handleGoBack = () => {
        navigate('/habitaciones');
    };

    return (
        <Container className="py-4">
            <HabitacionDetail
                habitacionDetalle={habitacionDetalle}
                onUpdate={handleActualizarHabitacion}
                onDelete={handleBorrarHabitacion}
                onGoBack={handleGoBack}
                modoEdicion={modoEdicion}
                onCancelarEdicion={handleCancelarEdicion}
                onGuardarCambios={handleGuardarCambios}
                tipoHabitacionOptions={tipoHabitacionOptions}
                hotelOptions={hotelOptions}
            />
        </Container>
    );
};

export default HabitacionDetallePage;
