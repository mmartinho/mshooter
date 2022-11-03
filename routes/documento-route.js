const { Router } = require('express');
const DocumentoController = require('../controllers/documento-controller');

const router = Router();

/** Create a single object */
router.post('/documento', DocumentoController.criar);
/** Update a single object */
router.put('/documento/:id', DocumentoController.atualizar);

module.exports = router;