const { Router } = require('express');
const EsportistaController = require('../controllers/esportista-controller');

const router = Router();

/** List all objects */
router.get('/esportista', EsportistaController.listAll);
/** Get a single object */
router.get('/esportista/:id', EsportistaController.singleObject);
/** Create a single object */
router.post('/esportista', EsportistaController.createObject);
/** Update a single object */
router.put('/esportista/:id', EsportistaController.updateObject);
/** Delete a single object */
router.delete('/esportista/:id', EsportistaController.deleteObject);

module.exports = router;