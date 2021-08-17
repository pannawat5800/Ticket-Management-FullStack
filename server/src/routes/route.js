const express = require('express');
const router = express.Router();

const { CreateTicketController } = require('../controllers/ticket/createTicket.controller');
const { GetTicketListController } = require('../controllers/ticket/getTicketList.controller');
const { UpdateStatusTicketController } = require('../controllers/ticket/updateTicketStatus.controller');

const { TicketApiValidator } = require('../middlewares/validation/ticket_api.validator');

router.put('/ticket/create', TicketApiValidator, CreateTicketController);
router.get('/ticket/list', GetTicketListController);
router.post('/ticket/status/update', TicketApiValidator, UpdateStatusTicketController);

module.exports = router;