const { ResponseCore } = require('../../core/response.core');
const { TicketService } = require('../../services/Ticket.service');
module.exports.UpdateStatusTicketController = async function(request, response) {
    const body = request.body;
    const responseCore = new ResponseCore();
    try {
        const ticketService = new TicketService();
        const updateResult = await ticketService.updateStatus(body);
        console.log("update: ", updateResult);

        response.json(responseCore.success(updateResult));

    } catch (error) {
        console.log("error update status ticket controller: ", error);
    }
}