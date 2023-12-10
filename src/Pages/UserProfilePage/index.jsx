import React, { useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';

const UserProfilePage = () => {
    useEffect(() => {
        const timer = setTimeout(() => {
            window.location.href = 'http://localhost:5173/profile';
        }, 500);

        return () => clearTimeout(timer); // Limpia el timer si el componente se desmonta antes
    }, []);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            {/* Spinner de React Bootstrap */}
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Cargando...</span>
            </Spinner>
        </div>
    );
};

export default UserProfilePage;
