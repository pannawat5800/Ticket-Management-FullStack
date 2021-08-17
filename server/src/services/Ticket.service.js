const { TicketModel } = require('../models/ticket.model');

class TicketService {

    async createNewTicket({ title, description, contact }) {
        const ticket = new TicketModel({
            title: title,
            description: description,
            contact: contact
        });
        const result = await ticket.save();
        return result;
    }

    async getListTickets() {
        const result = await TicketModel.find({}).sort({ date_update: -1 }).exec();
        return result;
    }

    async updateStatus({ id, status }) {
        const result = await TicketModel.findByIdAndUpdate(id, { status: status }, { new: true });
        return result;
    }
}


module.exports.TicketService = TicketService;