// src/api/ciudades.js

export const ObtenerCiudades = async (token) => {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        },
    };

    try {
        // Realiza la solicitud al servidor
        const response = await fetch(`${import.meta.env.VITE_ADMIN_BACKEND}/ciudad/get`, requestOptions);

        if (response.ok) {
            // La solicitud fue exitosa, obtén la información como JSON
            const ciudades = await response.json();
            return ciudades; // devuelve los ciudades
        } else {
            console.error('Error al obtener los ciudades');
        }
    } catch (error) {
        console.error('Error en la solicitud al servidor:', error.message);
    }
};

export const crearCiudad = async (token, ciudadData) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(ciudadData),
    };

    try {
        const response = await fetch(`${import.meta.env.VITE_ADMIN_BACKEND}/ciudad/create`, requestOptions);

        if (response.ok) {
            return response.json(); // Retorna la respuesta del servidor
        } else {
            console.error('Error al crear el ciudad');
        }
    } catch (error) {
        console.error('Error en la solicitud:', error.message);
    }
};

export const actualizarCiudad = async (token, ciudadData) => {
    const requestOptions = {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(ciudadData),
    };

    try {
        const response = await fetch(`${import.meta.env.VITE_ADMIN_BACKEND}/ciudad/update`, requestOptions);

        if (response.ok) {
            const data = await response.json();
            return data; // Retorna los datos actualizados del ciudad
        } else {
            console.error('Error al actualizar el ciudad');
        }
    } catch (error) {
        console.error('Error en la solicitud:', error.message);
    }
};

export const eliminarCiudad = async (token, ciudadId) => {
    const requestOptions = {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };

    try {
        const response = await fetch(`${import.meta.env.VITE_ADMIN_BACKEND}/ciudad/delete?id=${ciudadId}`, requestOptions);

        if (response.ok) {
            return response.json(); // O simplemente un mensaje de éxito
        } else {
            console.error('Error al eliminar el ciudad');
            const errorData = await response.json();
            throw new Error(errorData.error || 'Error desconocido al eliminar el ciudad');
        }
    } catch (error) {
        console.error('Error en la solicitud:', error.message);
        throw error; // Re-lanzar el error para manejarlo en el componente
    }
};

