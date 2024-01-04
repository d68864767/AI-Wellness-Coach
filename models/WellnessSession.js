const mongoose = require('mongoose');

const WellnessSessionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    wellnessAdvice: {
        type: String,
        required: true
    },
    mentalHealthSupport: {
        type: String,
        required: true
    },
    dailyWellnessTips: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('WellnessSession', WellnessSessionSchema);
