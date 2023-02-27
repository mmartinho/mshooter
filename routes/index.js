const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const pce = require('./pce-route');
const local = require('./local-route');
const esportista = require('./esportista-route');
const usuario = require('./usuario-route');
const municao = require('./municao-route');
const insumo = require('./insumo-route');
const movimentacao = require('./movimentacoes/movimentacao-route');
const movimentacaoAquisicao = require('./movimentacoes/movimentacao-aquisicao-route');
const movimentacaoDescarte = require('./movimentacoes/movimentacao-descarte-route');
const movimentacaoRecarga = require('./movimentacoes/movimentacao-recarga-route');
const movimentacaoDesmontagem = require('./movimentacoes/movimentacao-desmontagem-route');
const movimentacaoUtilizacao = require('./movimentacoes/movimentacao-utilizacao-route');
const movimentacaoReutilizacao = require('./movimentacoes/movimentacao-reutilizacao-route');
const movimentacaoDocumento = require('./movimentacoes/movimentacao-documento-route');
const comunicacao = require('./comunicacao-route');
const noRoute = require('./no-route');

module.exports = (app) => {
    app.use(cors({exposedHeaders: ['x-access-token']}));
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
    app.use(municao);
    app.use(insumo);
    app.use(movimentacao);
    app.use(movimentacaoAquisicao);
    app.use(movimentacaoDescarte);
    app.use(movimentacaoRecarga);
    app.use(movimentacaoDesmontagem);
    app.use(movimentacaoUtilizacao);
    app.use(movimentacaoReutilizacao);    
    app.use(movimentacaoDocumento);
    app.use(comunicacao);
    app.use(noRoute); // sempre por último
}