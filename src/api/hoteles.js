// src/api/hoteles.js

export const ObtenerHoteles = async (token) => {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        },
    };

    try {
        // Realiza la solicitud al servidor
        const response = await fetch(`${import.meta.env.VITE_ADMIN_BACKEND}/hotel/get`, requestOptions);

        if (response.ok) {
            // La solicitud fue exitosa, obtén la información como JSON
            const hoteles = await response.json();
            return hoteles; // Devuelve los hoteles
        } else {
            console.error('Error al obtener los hoteles');
        }
    } catch (error) {
        console.error('Error en la solicitud al servidor:', error.message);
    }
};


export const ObtenerHabitacionesHotel = async (token, hotelId) => {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };

    try {
        const response = await fetch(`${import.meta.env.VITE_ADMIN_BACKEND}/hotel/get/${hotelId}`, requestOptions);

        if (!response.ok) {
            // Puedes manejar errores aquí si es necesario
            throw new Error(`Error en la solicitud: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        // Puedes manejar errores aquí si es necesario
        console.error('Error al obtener las habitaciones:', error);
        throw error;
    }
};


export const crearHotel = async (token, nuevoHotel) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevoHotel),
    };

    try {
        const response = await fetch(`${import.meta.env.VITE_ADMIN_BACKEND}/hotel/create`, requestOptions);

        if (response.ok) {
            return response.json(); // Retorna la respuesta del servidor
        } else {
            console.error('Error al crear el hotel');
        }
    } catch (error) {
        console.error('Error en la solicitud:', error.message);
    }
};

export const actualizarHotel = async (token, hotelData) => {
    const requestOptions = {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(hotelData),
    };

    try {
        const response = await fetch(`${import.meta.env.VITE_ADMIN_BACKEND}/hotel/update`, requestOptions);

        if (response.ok) {
            const data = await response.json();
            return data; // Retorna los datos actualizados del hotel
        } else {
            console.error('Error al actualizar el hotel');
        }
    } catch (error) {
        console.error('Error en la solicitud:', error.message);
    }
};

export const eliminarHotel = async (token, hotelId) => {
    const requestOptions = {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };

    try {
        const response = await fetch(`${import.meta.env.VITE_ADMIN_BACKEND}/hotel/delete?id=${hotelId}`, requestOptions);

        if (response.ok) {
            return response.json(); // O simplemente un mensaje de éxito
        } else {
            console.error('Error al eliminar el hotel');
            const errorData = await response.json();
            throw new Error(errorData.error || 'Error desconocido al eliminar el hotel');
        }
    } catch (error) {
        console.error('Error en la solicitud:', error.message);
        throw error; // Re-lanzar el error para manejarlo en el componente
    }
};
