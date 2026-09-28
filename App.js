const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const port = 3000;

// Parsear las solicitudes a formato JSON
app.use(bodyParser.json());
app.use(cors());

// Importar las rutas de productos
const productoRoute = require('./routes/producto');
app.use('/servicios', productoRoute);

// Ruta de prueba por defecto
app.get('/', (req, res) => {
    res.send('API REST de Electrónica 360 funcionando correctamente');
});

// Conexión con MongoDB
mongoose.connect('mongodb://localhost:27017/electronica360')
    .then(() => {
        console.log('Sí hay conexión a la BD electronica360');
    })
    .catch((error) => {
        console.log('Error al conectar a la BD:', error);
    });

// Configuración del puerto del servidor
app.listen(port, () => {
    console.log(`Servidor ejecutándose en el puerto ${port}`);
});