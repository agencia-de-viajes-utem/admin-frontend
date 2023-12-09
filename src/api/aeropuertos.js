// src/api/aeropuertos.js

export const ObtenerAeropuertos = async (token) => {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        },
    };

    try {
        // Realiza la solicitud al servidor
        const response = await fetch(`${import.meta.env.VITE_ADMIN_BACKEND}/aeropuerto/get`, requestOptions);

        if (response.ok) {
            // La solicitud fue exitosa, obtén la información como JSON
            const aeropuertos = await response.json();
            return aeropuertos; // devuelve los aeropuertos
        } else {
            console.error('Error al obtener los aeropuertos');
        }
    } catch (error) {
        console.error('Error en la solicitud al servidor:', error.message);
    }
};

export const crearAeropuerto = async (token, ciudadData) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(ciudadData),
    };

    try {
        const response = await fetch(`${import.meta.env.VITE_ADMIN_BACKEND}/aeropuerto/create`, requestOptions);

        if (response.ok) {
            return response.json(); // Retorna la respuesta del servidor
        } else {
            console.error('Error al crear el aeropuerto');
        }
    } catch (error) {
        console.error('Error en la solicitud:', error.message);
    }
};

export const actualizarAeropuerto = async (token, ciudadData) => {
    const requestOptions = {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(ciudadData),
    };

    try {
        const response = await fetch(`${import.meta.env.VITE_ADMIN_BACKEND}/aeropuerto/update`, requestOptions);

        if (response.ok) {
            const data = await response.json();
            return data; // Retorna los datos actualizados del aeropuerto
        } else {
            console.error('Error al actualizar el aeropuerto');
        }
    } catch (error) {
        console.error('Error en la solicitud:', error.message);
    }
};

export const eliminarAeropuerto = async (token, ciudadId) => {
    const requestOptions = {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };

    try {
        const response = await fetch(`${import.meta.env.VITE_ADMIN_BACKEND}/aeropuerto/delete?id=${ciudadId}`, requestOptions);

        if (response.ok) {
            return response.json(); // O simplemente un mensaje de éxito
        } else {
            console.error('Error al eliminar el aeropuerto');
            const errorData = await response.json();
            throw new Error(errorData.error || 'Error desconocido al eliminar el aeropuerto');
        }
    } catch (error) {
        console.error('Error en la solicitud:', error.message);
        throw error; // Re-lanzar el error para manejarlo en el componente
    }
};

