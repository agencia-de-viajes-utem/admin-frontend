// src/api/paises.js

export const ObtenerPaises = async (token) => {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        },
    };

    try {
        // Realiza la solicitud al servidor
        const response = await fetch(`${import.meta.env.VITE_ADMIN_BACKEND}/pais/get`, requestOptions);

        if (response.ok) {
            // La solicitud fue exitosa, obtén la información como JSON
            const paises = await response.json();
            return paises; // devuelve los países
        } else {
            console.error('Error al obtener los países');
        }
    } catch (error) {
        console.error('Error en la solicitud al servidor:', error.message);
    }
};

export const crearPais = async (token, paisData) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(paisData),
    };

    try {
        const response = await fetch(`${import.meta.env.VITE_ADMIN_BACKEND}/pais/create`, requestOptions);

        if (response.ok) {
            return response.json(); // Retorna la respuesta del servidor
        } else {
            console.error('Error al crear el país');
        }
    } catch (error) {
        console.error('Error en la solicitud:', error.message);
    }
};

export const actualizarPais = async (token, paisData) => {
    const requestOptions = {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(paisData),
    };

    try {
        const response = await fetch(`${import.meta.env.VITE_ADMIN_BACKEND}/pais/update`, requestOptions);

        if (response.ok) {
            const data = await response.json();
            return data; // Retorna los datos actualizados del país
        } else {
            console.error('Error al actualizar el país');
        }
    } catch (error) {
        console.error('Error en la solicitud:', error.message);
    }
};

export const eliminarPais = async (token, paisId) => {
    const requestOptions = {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };

    try {
        const response = await fetch(`${import.meta.env.VITE_ADMIN_BACKEND}/pais/delete?id=${paisId}`, requestOptions);

        if (response.ok) {
            return response.json(); // O simplemente un mensaje de éxito
        } else {
            console.error('Error al eliminar el país');
            const errorData = await response.json();
            throw new Error(errorData.error || 'Error desconocido al eliminar el país');
        }
    } catch (error) {
        console.error('Error en la solicitud:', error.message);
        throw error; // Re-lanzar el error para manejarlo en el componente
    }
};

