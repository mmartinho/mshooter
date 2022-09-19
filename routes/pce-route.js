const { Router } = require('express');
const PCEController = require('../controllers/pce-controller');

const router = Router();

/** List all objects */
router.get('/pce', PCEController.listAll);
/** Get a single */
router.get('/pce/:id', PCEController.singleObject);
/** Create a single object */
router.post('/pce', PCEController.createObject);
/** Update a single object */
router.put('/pce/:id', PCEController.updateObject);
/** Delete a single object */
router.delete('/pce/:id', PCEController.deleteObject);

module.exports = router;