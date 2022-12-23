const { Router } = require('express');

const router = Router();

function error404Message(req, res) {
    const url = req.originalUrl;
    return res.status(404).json({message: `Rota ${url} não encontrada`});
}

router.all('*', error404Message);
//router.post('*', error404Message);
//router.put('*', error404Message);
//router.delete('*', error404Message);

module.exports = router;