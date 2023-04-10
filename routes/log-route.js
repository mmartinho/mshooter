const { Router } = require('express');

/************************************************************************************
 * Projeto: mShooter / Backend App
 * Autore(s): Marcus Martinho
 * Data: Ago/2022
 * Arquivo: Rotas de "Log" do serviço de Registro de log usado pela app Frontend
 *          @see models\classes\logging.js
 ************************************************************************************/
const router = Router();
const Logging = require('../models/classes/logging');

/**
 * Espera no "req.body" objeto nesse formato:
 * {  
 *   message: string;
 *   url: string;
 *   user: string;
 *   stack: string;
 * }
 */
function log(req, res) {
    const err = req.body;
    let log = new Logging();
    log.write('error', `URL: ${err.url}, usuário: ${err.user}, mensagem: ${err.message}`);
    log.write('error', `${err.stack}`);
    return res.status(201).json({message: `Erro registrado no servidor com sucesso`});
}

router.post('/log', log);

module.exports = router;