const { ResponseCore } = require('../../core/response.core');
const { TicketService } = require('../../services/Ticket.service');
module.exports.CreateTicketController = async function(request, response) {
    const newTickerData = request.body;
    console.log("body: ", newTickerData);

    const responseCore = new ResponseCore();

    try {
        const ticketService = new TicketService();
        const result = await ticketService.createNewTicket(newTickerData);
        console.log("create result : ", result);

        response.json(responseCore.success(result));

    } catch (error) {
        console.log("error create ticket controller: ", error);
        response.status(500).send({ error: error });
    }
}