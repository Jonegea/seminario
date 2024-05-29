const express = require('express');
const app = express();

// Middleware para analizar el cuerpo de las solicitudes como JSON
app.use(express.json());

// Importar las funciones
const { crearUsuario, crearAccion, crearGrupo, eliminarUsuario, eliminarAccion, eliminarGrupo } = require('./app');

// Ruta para crear un usuario
app.post('/crearUsuario', async (req, res) => {
    const { nombre } = req.body;
    if (!nombre) {
        return res.status(400).send({ error: 'Debe incluir el parametro nombre!' });
    }
    try {
        await crearUsuario(nombre);
        return res.status(201).send({ mensaje: 'Usuario creado exitosamente!' });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ error: 'Error al crear el usuario' });
    }
});

// Definir otras rutas para las demás funciones según sea necesario

const PORT = 3000;
app.listen(PORT, (error) => {
    if (error) {
        console.log('Error en la configuración');
    }
    console.log(`Servidor ejecutándose en: http://127.0.0.1:${PORT}`);
});
