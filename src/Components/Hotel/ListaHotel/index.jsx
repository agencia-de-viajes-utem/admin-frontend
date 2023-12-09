import React from 'react';
import { FaHotel } from 'react-icons/fa';

const HotelList = ({ hoteles, onHotelClick }) => {
    return (
        <div>
            <h2>Lista de Hoteles</h2>
            <div className="d-flex flex-wrap">
                {hoteles.map((hotel) => (
                    <div
                        key={hotel.ID}
                        role='button'
                        className="d-flex align-items-center border rounded m-2 p-2 btn btn-outline-secondary"
                        onClick={() => onHotelClick(hotel)}
                    >
                        <FaHotel size={30} className="me-2" />
                        <div>
                            <div><strong>ID:</strong> {hotel.ID}</div>
                            <div><strong>Nombre:</strong> {hotel.Nombre}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HotelList;
