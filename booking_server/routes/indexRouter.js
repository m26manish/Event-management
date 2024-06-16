const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController')
const { body, query, param } = require('express-validator');
const ticketBooking = require("../controllers/bookingController")

router.get('/eventlist',eventController.eventList);
router.get('/eventid/:_id',eventController.particular_event);
router.post('/bookticket',ticketBooking.bookEvent);
router.get('/verifyticket/:ticket_hash',ticketBooking.ticketVerification);

module.exports = router;