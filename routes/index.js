const express = require('express');
const fileUpload = require('express-fileupload');
const pce = require('./pce-route');
const local = require('./local-route');
const esportista = require('./esportista-route');
const usuario = require('./usuario-route');
const documento = require('./documento-route');
const municao = require('./municao-route');

module.exports = (app) => {
    app.use(express.json());
    app.use(fileUpload({
        limits : { fileSize: 50*1024*1024 },
        useTempFiles : true,
        tempFileDir : __basedir + `/${process.env.TEMP_FILE_DIR}/`        
    }));
    app.use(pce);
    app.use(local);
    app.use(esportista);
    app.use(usuario);
    app.use(documento);
    app.use(municao);
}