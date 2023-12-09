import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { tables, tableIcons } from '../../Mocks/tables'; // Importa tables y tableIcons
import './TablesGrid.css';

const TablesGrid = () => {
    return (
        <div className="container">
            <div className="row">
                {tables.map((table, index) => (
                    <div key={index} className="col-md-4 mb-4 d-flex justify-content-center align-items-center">
                        <Link to={`/${table.Ruta}`} className="w-100 h-100">
                            <Button className="table-button">
                                {tableIcons[table.Tabla.toLowerCase()]} {/* Asigna el ícono según el nombre de la tabla */}
                                {table.Tabla}
                            </Button>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TablesGrid;
