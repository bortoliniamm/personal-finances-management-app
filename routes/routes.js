const express = require('express');
const router = express();
const controller = require('../services/transactionService.js');

router.get('/all', controller.findAll);
router.get('/period=:period', controller.findByYearMonth);
router.get('/day=:day', controller.findByYearMonthDay);

router.post('/register', controller.register);

router.put('/update/id=:id', controller.update);
router.get('/expenses', controller.updateExpenses);

router.delete('/delete/id=:id', controller.remove);
router.delete('/delete/all', controller.removeAll);


module.exports = router;
