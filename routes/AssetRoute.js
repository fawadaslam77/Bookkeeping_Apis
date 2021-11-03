const express = require('express');
const router = express.Router();

const Auth = require('../middlewares/AuthMiddleware');

const assetController = require('../controllers/AssetController');

router.post('/add', Auth, assetController.addAsset);
router.put('/update/:id', Auth, assetController.updateAsset);
router.get('/list', Auth, assetController.getAsset);

module.exports = router;
