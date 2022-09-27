const express = require('express');
const pce = require('./pce-route');
const local = require('./local-route');
const esportista = require('./esportista-route');
const usuario = require('./usuario-route');

module.exports = (app) => {
    app.use(express.json());
    app.use(pce);
    app.use(local);
    app.use(esportista);
    app.use(usuario);
}