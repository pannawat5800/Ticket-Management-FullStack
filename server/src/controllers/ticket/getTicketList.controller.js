const { ResponseCore } = require('../../core/response.core');
const { TicketService } = require('../../services/Ticket.service');

module.exports.GetTicketListController = async function(request, response) {
    const responseCore = new ResponseCore();
    try {
        const ticketService = new TicketService();
        const tickets = await ticketService.getListTickets();
        console.log("tickets: ", tickets);

        response.json(responseCore.success(tickets));

    } catch (error) {
        console.log("error get ticket list controller: ", error);
        response.send({ error: error });
    }

}