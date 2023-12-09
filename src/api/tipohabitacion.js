// src/api/tipohabitacion.js

export const ObtenerTipoHabitacion = async (token) => {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        },
    };

    try {
        // Realiza la solicitud al servidor
        const response = await fetch(`${import.meta.env.VITE_ADMIN_BACKEND}/tipo_habitacion/get`, requestOptions);

        if (response.ok) {
            // La solicitud fue exitosa, obtén la información como JSON
            const tipo_habitacion = await response.json();
            return tipo_habitacion; // devuelve los tipo_habitacion
        } else {
            console.error('Error al obtener los tipo_habitacion');
        }
    }
    catch (error) {
        console.error('Error en la solicitud al servidor:', error.message);
    }
};

export const crearTipoHabitacion = async (token, tipo_habitacionData) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(tipo_habitacionData),
    };

    try {
        const response = await fetch(`${import.meta.env.VITE_ADMIN_BACKEND}/tipo_habitacion/create`, requestOptions);

        if (response.ok) {
            return response.json(); // Retorna la respuesta del servidor
        } else {
            console.error('Error al crear el tipo_habitacion');
        }
    } catch (error) {
        console.error('Error en la solicitud:', error.message);
    }
};

export const actualizarTipoHabitacion = async (token, tipo_habitacionData) => {
    const requestOptions = {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(tipo_habitacionData),
    };

    try {
        const response = await fetch(`${import.meta.env.VITE_ADMIN_BACKEND}/tipo_habitacion/update`, requestOptions);

        if (response.ok) {
            return response.json(); // Retorna la respuesta del servidor
        } else {
            console.error('Error al actualizar el tipo_habitacion');
        }
    } catch (error) {
        console.error('Error en la solicitud:', error.message);
    }
};

export const eliminarTipoHabitacion = async (token, tipo_habitacionId) => {
    const requestOptions = {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };

    try {
        const response = await fetch(`${import.meta.env.VITE_ADMIN_BACKEND}/tipo_habitacion/delete?id=${tipo_habitacionId}`, requestOptions);

        if (response.ok) {
            return response.json(); // O simplemente un mensaje de éxito
        } else {
            console.error('Error al eliminar el tipo_habitacion');
            const errorData = await response.json();
            throw new Error(errorData.error || 'Error desconocido al eliminar el tipo_habitacion');
        }
    } catch (error) {
        console.error('Error en la solicitud:', error.message);
        throw error; // Re-lanzar el error para manejarlo en el componente
    }
};  