const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    eventTiming: {
        type: Date,
        required: true,
    },

    duration: {
        type: String,
        required: true,
    },

    topic: {
        type: String,
        required: true,
        max: 255
    },

    handle: {
        type: String,
        required: true,
        max: 255
    },

    attendedUsers: {
        type: Array,
        default: []
    },

});

module.exports = mongoose.model('Events', EventSchema);