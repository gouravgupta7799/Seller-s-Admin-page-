const express = require('express');
const router = express.Router();
const controller = require('../controller/controller');


router.post('/', controller.postData);
router.get('/', controller.getData);
router.put('/', controller.updateData);


module.exports = router;