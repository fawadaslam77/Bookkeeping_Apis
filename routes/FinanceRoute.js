const express = require('express');
const router = express.Router();

const Auth = require('../middlewares/AuthMiddleware');

const financeController = require('../controllers/FinanceController');

router.post('/add', Auth, financeController.addFinance);
router.put('/update/:id', Auth, financeController.updateFinance);
router.get('/list', Auth, financeController.getFinance);

module.exports = router;
