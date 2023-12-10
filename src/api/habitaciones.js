// src/api/habitaciones.js

export const ObtenerHabitaciones = async (token) => {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        },
    };

    try {
        // Realiza la solicitud al servidor
        const response = await fetch(`${import.meta.env.VITE_ADMIN_BACKEND}/habitacion/get`, requestOptions);

        if (response.ok) {
            // La solicitud fue exitosa, obtén la información como JSON
            const habitaciones = await response.json();
            return habitaciones; // devuelve los habitaciones
        } else {
            console.error('Error al obtener los habitaciones');
        }
    }
    catch (error) {
        console.error('Error en la solicitud al servidor:', error.message);
    }
};

export const crearHabitacion = async (token, habitacionData) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(habitacionData),
    };

    try {
        const response = await fetch(`${import.meta.env.VITE_ADMIN_BACKEND}/habitacion/create`, requestOptions);

        if (response.ok) {
            return response.json(); // Retorna la respuesta del servidor
        } else {
            console.error('Error al crear el habitacion');
        }
    } catch (error) {
        console.error('Error en la solicitud:', error.message);
    }
};

export const ObtenerHabitacionDetalle = async (token, habitacionID) => {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        },
    };

    try {
        // Realiza la solicitud al servidor para obtener el detalle de la habitación
        const response = await fetch(`${import.meta.env.VITE_ADMIN_BACKEND}/habitacion/get/${habitacionID}`, requestOptions);

        if (response.ok) {
            // La solicitud fue exitosa, obtén la información como JSON
            const detalleHabitacion = await response.json();
            return detalleHabitacion;
        } else {
            console.error('Error al obtener el detalle de la habitación');
        }
    } catch (error) {
        console.error('Error en la solicitud al servidor:', error.message);
    }
};


export const actualizarHabitacion = async (token, habitacionData) => {
    const requestOptions = {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(habitacionData),
    };

    try {
        const response = await fetch(`${import.meta.env.VITE_ADMIN_BACKEND}/habitacion/update`, requestOptions);

        if (response.ok) {
            return response.json(); // Retorna la respuesta del servidor
        } else {
            console.error('Error al actualizar el habitacion');
        }
    } catch (error) {
        console.error('Error en la solicitud:', error.message);
    }
};

export const eliminarHabitacion = async (token, habitacionID) => {
    const requestOptions = {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    };

    try {
        const response = await fetch(`${import.meta.env.VITE_ADMIN_BACKEND}/habitacion/delete?id=${habitacionID}`, requestOptions);

        if (response.ok) {
            return response.json(); // Retorna la respuesta del servidor
        } else {
            console.error('Error al eliminar el habitacion');
        }
    } catch (error) {
        console.error('Error en la solicitud:', error.message);
    }
};

