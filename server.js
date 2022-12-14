import express from 'express';
// const express = require('express');
import routerProducts from './router/products.js';
// import DB from './model/products-mongodb.js';
import config from './config.js'


// DB.connectDB();

const app = express();

app.use(express.static('public', { extensions: ['html', 'htm'] }));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/api/products', routerProducts)

const PORT = config.PORT;
const server = app.listen(PORT, () => console.log(`Servidor Express conectado en el puerto ${PORT}.`));
server.on('error', error => console.log('Error al iniciar el servidor Express: ' + error.message));
