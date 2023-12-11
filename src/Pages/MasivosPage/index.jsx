import React, { useState } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { tables, tableIcons } from '/src/mocks/tables.jsx'; // Asegúrate de tener la ruta correcta

const tableHeaders = {
    paquetes: {
        headers: [
            'ID',
            'Nombre',
            'IDAeropuertoOrigen',
            'IDAeropuertoDestino',
            'Descripcion',
            'Detalles',
            'PrecioVuelo',
            'HabitacionIDs',
            'Imagenes',
            'IDAerolinea',
        ],
    },
    // Agrega otros mapeos de tablas aquí si es necesario
};

const columnTypes = {
    'ID': 'int',
    'Nombre': 'string',
    'IDAeropuertoOrigen': 'int',
    'IDAeropuertoDestino': 'int',
    'Descripcion': 'string',
    'Detalles': 'string',
    'PrecioVuelo': 'double',
    'HabitacionIDs': '[int]',
    'Imagenes': '[string]',
    'IDAerolinea': 'int',
};

const MasivosPage = () => {
    const [selectedTable, setSelectedTable] = useState('');
    const [csvData, setCsvData] = useState('');

    const handleTableSelect = (event) => {
        setSelectedTable(event.target.value);
    };

    const handleCSVSubmit = () => {
        // Dividir el CSV en líneas
        const lines = csvData.split('\n');
        const data = [];

        // Expresión regular para dividir la línea teniendo en cuenta las comas dentro de comillas
        const csvSplitter = /,(?=(?:(?:[^"]*"){2})*[^"]*$)/;

        // Procesar cada línea del CSV
        for (const line of lines) {
            const row = line.split(csvSplitter).map((value) => {
                // Eliminar las comillas dobles que rodean los valores si están presentes
                return value.replace(/^"|"$/g, '');
            });

            // Verificar si el número de columnas coincide con el número de encabezados
            if (row.length === tableHeaders[selectedTable].headers.length) {
                const rowData = {};
                tableHeaders[selectedTable].headers.forEach((header, index) => {
                    const columnName = header;
                    const columnType = columnTypes[columnName];
                    let formattedValue = row[index];

                    // Convertir el valor al tipo de dato correspondiente
                    switch (columnType) {
                        case 'int':
                            formattedValue = parseInt(formattedValue);
                            break;
                        case 'double':
                            formattedValue = parseFloat(formattedValue);
                            break;
                        case '[int]':
                            formattedValue = JSON.parse(formattedValue);
                            break;
                        case '[string]':
                            formattedValue = JSON.parse(formattedValue);
                            break;
                        // Puedes agregar más casos según tus necesidades
                        default:
                            // Mantener el valor como string por defecto
                            break;
                    }

                    rowData[columnName] = formattedValue;
                });
                data.push(rowData);
            } else {
                alert('El CSV no tiene la cantidad adecuada de columnas según los encabezados.');
                return; // Salir del proceso si no coincide
            }
        }

        // Aquí puedes usar la variable "selectedTable" para determinar la tabla seleccionada
        // y procesar el arreglo "data" en consecuencia
        console.log('Tabla seleccionada:', selectedTable);
        console.log('Datos CSV:', data);
    };

    const pageTitle = selectedTable ? `Insertar datos en la tabla ${selectedTable}` : 'Página Masivo';

    return (
        <Container>
            <Row>
                <Col>
                    <h1>{pageTitle}</h1>
                    <Form>
                        <Form.Group controlId="csvTextArea">
                            <Form.Label>Pegue su CSV aquí:</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={10}
                                value={csvData}
                                onChange={(e) => setCsvData(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="selectTable">
                            <Form.Label>Seleccione una tabla:</Form.Label>
                            <Form.Control
                                as="select"
                                value={selectedTable}
                                onChange={handleTableSelect}
                            >
                                <option value="">Seleccione una tabla</option>
                                {tables.map((tabla, index) => (
                                    <option key={index} value={tabla.Ruta}>
                                        {tableIcons[tabla.Tabla]} {tabla.Tabla}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </Form>
                    <Button variant="primary" onClick={handleCSVSubmit}>
                        Procesar CSV
                    </Button>
                    {selectedTable && (
                        <div>
                            <h2>Encabezados de la tabla:</h2>
                            <p>{tableHeaders[selectedTable].headers.join(', ')}</p>
                        </div>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default MasivosPage;
