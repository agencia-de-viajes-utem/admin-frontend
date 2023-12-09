export const ObtenerAerolineas = async (token) => {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        },
    };

    try {
        const response = await fetch(`${import.meta.env.VITE_ADMIN_BACKEND}/aerolinea/get`, requestOptions);

        if (response.ok) {
            const aerolineas = await response.json();
            return aerolineas;
        } else {
            console.error('Error al obtener las aerolineas');
        }
    } catch (error) {
        console.error('Error en la solicitud al servidor:', error.message);
    }
};

export const crearAerolinea = async (token, aerolineaData) => {

    const requestOptions = {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(aerolineaData),
    };

    try {
        const response = await fetch(`${import.meta.env.VITE_ADMIN_BACKEND}/aerolinea/create`, requestOptions);

        if (response.ok) {
            return response.json();
        } else {
            console.error('Error al crear la aerolinea');
        }
    } catch (error) {
        console.error('Error en la solicitud:', error.message);
    }
};

export const actualizarAerolinea = async (token, aerolineaData) => {
    const requestOptions = {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(aerolineaData),
    };

    try {
        const response = await fetch(`${import.meta.env.VITE_ADMIN_BACKEND}/aerolinea/update`, requestOptions);

        if (response.ok) {
            return response.json();
        } else {
            console.error('Error al actualizar la aerolinea');
        }
    } catch (error) {
        console.error('Error en la solicitud:', error.message);
    }
};

export const eliminarAerolinea = async (token, aerolineaId) => {
    const requestOptions = {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };

    try {
        const response = await fetch(`${import.meta.env.VITE_ADMIN_BACKEND}/aerolinea/delete?id=${aerolineaId}`, requestOptions);

        if (response.ok) {
            return response.json();
        } else {
            console.error('Error al eliminar la aerolinea');
            const errorData = await response.json();
            throw new Error(errorData.error || 'Error desconocido al eliminar la aerolinea');
        }
    } catch (error) {
        console.error('Error en la solicitud:', error.message);
        throw error;
    }
};
