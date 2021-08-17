const mongoose = require('mongoose');
const { Schema } = mongoose;

const TicketSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    contact: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'resolved', 'rejected'],
        default: "pending",
        required: true
    },
    date_create: { type: Date, default: Date.now, index: true },
    date_update: { type: Date, default: Date.now, index: true }
}, { versionKey: false, timestamps: { createdAt: "date_create", updatedAt: 'date_update' } });

module.exports.TicketModel = mongoose.model('Tickets', TicketSchema);