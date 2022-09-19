const { Router } = require('express');
const LocalController = require('../controllers/local-controller');

const router = Router();

/** List all objects */
router.get('/local', LocalController.listAll);
/** Get a single object */
router.get('/local/:id', LocalController.singleObject);
/** Create a single object */
router.post('/local', LocalController.createObject);
/** Update a single object */
router.put('/local/:id', LocalController.updateObject);
/** Delete a single object */
router.delete('/local/:id', LocalController.deleteObject);

module.exports = router;