import React from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import { FiArrowLeft } from 'react-icons/fi';
import HabitacionForm from './HabitacionForm';
import { useHabitacionEditor } from './useHabitacionEditor';
import { useNavigate } from 'react-router-dom';

function HabitacionDetail({
    habitacionDetalle,
    onUpdate,
    onDelete,
    onGoBack,
    modoEdicion,
    onCancelarEdicion,
    onGuardarCambios,
    tipoHabitacionOptions,
    hotelOptions
}) {
    const navigate = useNavigate();
    const { editedHabitacionDetalle, handleInputChange } = useHabitacionEditor(habitacionDetalle, modoEdicion);

    const handleGuardar = () => {
        // Asegúrate de que todos los datos actualizados se pasen correctamente
        onGuardarCambios(editedHabitacionDetalle);
    };

    return (

        <>
            <Button variant="primary" onClick={onGoBack}><FiArrowLeft /> Volver</Button>
            <h1>Detalle de la Habitación</h1>
            {habitacionDetalle && (
                <HabitacionForm
                    habitacion={editedHabitacionDetalle}
                    onInputChange={handleInputChange}
                    tipoHabitacionOptions={tipoHabitacionOptions}
                    hotelOptions={hotelOptions}
                    modoEdicion={modoEdicion}
                />
            )}

            <Row className="mt-4">
                <Col>
                    <>
                        <Button variant={modoEdicion ? "success" : "primary"} onClick={modoEdicion ? handleGuardar : onUpdate}>
                            {modoEdicion ? "Guardar Cambios" : "Editar"}
                        </Button>
                        {habitacionDetalle && habitacionDetalle.ocupada ? (
                            <>
                                <Button
                                    variant="danger"
                                    onClick={onDelete}
                                    className="ms-2"
                                    disabled
                                >
                                    No se puede borrar una habitación ocupada
                                </Button>
                                <Button
                                    className='ms-2'
                                    variant="primary"
                                    onClick={() => navigate(`/paquetes/${habitacionDetalle.idPaquete}`)}
                                >
                                    Ver Paquete {habitacionDetalle.idPaquete}
                                </Button>
                            </>
                        ) : (
                            <Button
                                variant="danger"
                                onClick={onDelete}
                                className="ms-2"
                            >
                                Borrar
                            </Button>
                        )}
                    </>
                </Col>
                <Col>
                    {modoEdicion && (
                        <Button variant="danger" onClick={onCancelarEdicion}>
                            Cancelar
                        </Button>
                    )}
                </Col>
            </Row>
        </>
    );
}

export default HabitacionDetail;
