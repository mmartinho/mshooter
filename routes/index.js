/************************************************************************************
 * Projeto: mShooter / Backend App
 * Autore(s): Marcus Martinho
 * Data: Ago/2022
 * Arquivo: Carrega todas as rotas da aplicação, configura as bibliotecas cors, 
 *          express e fileUpload
 ************************************************************************************/

/** 
 * Libs principais 
 */
const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');

/**
 * Rotas principais
 */
const pce = require('./pce-route');
const local = require('./local-route');
const esportista = require('./esportista-route');
const usuario = require('./usuario-route');
const municao = require('./municao-route');
const insumo = require('./insumo-route');

/** 
 * Rotas de Movimentação de munição em insumos  
 */
const movimentacao = require('./movimentacoes/movimentacao-route');
const movimentacaoAquisicao = require('./movimentacoes/movimentacao-aquisicao-route');
const movimentacaoDescarte = require('./movimentacoes/movimentacao-descarte-route');
const movimentacaoRecarga = require('./movimentacoes/movimentacao-recarga-route');
const movimentacaoDesmontagem = require('./movimentacoes/movimentacao-desmontagem-route');
const movimentacaoUtilizacao = require('./movimentacoes/movimentacao-utilizacao-route');
const movimentacaoReutilizacao = require('./movimentacoes/movimentacao-reutilizacao-route');
const movimentacaoDocumento = require('./movimentacoes/movimentacao-documento-route');

const comunicacao = require('./comunicacao-route');

/** 
 * Serviço de registro de Log Externo. Usado pela aplicação 
 * frontend enviar informações sobre exceções, erros ou 
 * debug de forma automatizada
 */
const log = require('./log-route');

/**
 * Quando nenhuma rota da aplicação é encontrada
 */
const noRoute = require('./no-route');

module.exports = (app) => {
    /** Define as opções CORS */
    app.use(cors({
        origin: '*',
        allowedHeaders: [
            'Accept', 'Accept-Encoding', 'Authorization', 'Connection', 
            'Content-Length', 'Content-Type',  'ETag', 'Date', 
            'Host', 'Keep-Alive', 'X-Powered-By', 'User-Agent' 
        ],
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'HEAD', 'OPTIONS'],
        exposedHeaders: ['X-Powered-By', 'Authorization'],
        preflightContinue: false,
        optionsSuccessStatus: 204
    }));

    /** Acrescenta o formato json de req e res */
    app.use(express.json());

    /** Limita o upload de 50M, usando stream de arquivo temporário */
    app.use(fileUpload({
        limits : { fileSize: 50*1024*1024 },
        useTempFiles : true,
        tempFileDir : __basedir + `/${process.env.TEMP_FILE_DIR}/`        
    }));

    /** ****** Rotas e Subrotas ******* */
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
    app.use(log); 
    app.use(noRoute); // sempre por último
}