const express = require('express');
const router = express.Router();
const { body, query, param } = require('express-validator');
const paymentsControler = require('../controllers/paymentsController')


router.post('/createorder',
            paymentsControler.create_order_id
);
router.post('/paymentverification',
             paymentsControler.payment_verify
);

module.exports = router;
