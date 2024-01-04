const mongoose = require('mongoose');

const ActivitySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    mood: {
        type: String,
        required: true
    },
    activities: {
        type: String,
        required: true
    },
    wellnessTips: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Activity', ActivitySchema);
