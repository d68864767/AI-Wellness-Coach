const mongoose = require('mongoose');

const ChallengeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    startDate: {
        type: Date,
        default: Date.now
    },
    endDate: {
        type: Date,
        required: true
    },
    challengeType: {
        type: String,
        required: true
    },
    challengeDescription: {
        type: String,
        required: true
    },
    challengeStatus: {
        type: String,
        enum: ['Not Started', 'In Progress', 'Completed'],
        default: 'Not Started'
    }
});

module.exports = mongoose.model('Challenge', ChallengeSchema);
