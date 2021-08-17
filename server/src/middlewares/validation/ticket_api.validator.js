const Joi = require('joi');
const { ResponseCore } = require('../../core/response.core');

const CreateTicketSchema = Joi.object({
    title: Joi.string(),
    description: Joi.string().allow(null, ''),
    contact: Joi.string().length(10)
})

const UpdateStatusSchema = Joi.object({
    id: Joi.string(),
    status: Joi.string().valid('pending', 'accepted', 'resolved', 'rejected'),
})


module.exports.TicketApiValidator = async function(request, response, next) {
    const endpoint = request.route.path;
    const responseCore = new ResponseCore();

    try {
        if (endpoint === "/ticket/create") {
            await CreateTicketSchema.validateAsync(request.body);
        } else if (endpoint === "/ticket/status/update") {
            await UpdateStatusSchema.validateAsync(request.body);
        }

        next()
    } catch (error) {
        response.status(400).json(responseCore.invalideRequest(error['detail']))
    }
}