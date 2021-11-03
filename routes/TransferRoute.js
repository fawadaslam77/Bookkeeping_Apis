const express = require('express');
const router = express.Router();

const Auth = require('../middlewares/AuthMiddleware');

const TransferController = require('../controllers/TransferController');

router.post('/add', Auth, TransferController.addTransfer);
router.put('/update/:id', Auth, TransferController.updateTransfer);
router.get('/list', Auth, TransferController.getTransfer);
router.get('/accounts', Auth, TransferController.getAccounts);

module.exports = router;
