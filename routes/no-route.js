/************************************************************************************
 * Projeto: mShooter / Backend App
 * Autore(s): Marcus Martinho
 * Data: Ago/2022
 * Arquivo: Rota não encontrada 
 ************************************************************************************/
const { Router } = require('express');

const router = Router();

function error404Message(req, res) {
    const url = req.originalUrl;
    return res.status(404).json({message: `Rota ${url} não encontrada`});
}

router.all('*', error404Message);

module.exports = router;