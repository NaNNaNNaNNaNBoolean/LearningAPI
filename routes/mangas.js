const express = require('express');

const mangasController = require("../controllers/mangas");
const router = express.Router();

router.get('/', mangasController.index);

router.get('/:id', mangasController.show);

router.post('/', mangasController.create);

router.patch('/:id', mangasController.update);

router.delete('/:id', mangasController.destory);



module.exports = router;
