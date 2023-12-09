import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { FaUserCircle } from 'react-icons/fa';
import { ObtenerInfoPerfil } from '../../api/index';
import './AdminPage.css';

import TablesGrid from '../../Components/TablesGrid';


const AdminPage = () => {
    const [userData, setUserData] = useState({});

    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            ObtenerInfoPerfil(token).then((res) => {
                setUserData(res);
            }).catch((err) => {
                console.log(err);
            });
        }
    }, []);

    // Verificar si userData tiene la propiedad 'Nombre'
    const isUserLoggedIn = userData;

    return (
        <>
            <header className="text-center">
                {isUserLoggedIn ? (
                    <>
                        <h1>Admin {userData.Nombre} {userData.Apellido}</h1>
                        <a href="/profile" className="profile-icon">
                            <FaUserCircle size={30} />
                        </a>
                    </>
                ) : (
                    <h1>Admin anónimo</h1>
                )}
            </header>

            <main>
                <div className="d-flex text-center">
                    <TablesGrid />
                </div>
            </main></>
    );
};

export default AdminPage;
