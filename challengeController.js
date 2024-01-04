const express = require('express');
const Challenge = require('./models/Challenge');
const User = require('./models/User');

const router = express.Router();

// Get all challenges
router.get('/', async (req, res) => {
    try {
        const challenges = await Challenge.find();
        res.json(challenges);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get one challenge
router.get('/:id', getChallenge, (req, res) => {
    res.json(res.challenge);
});

// Create one challenge
router.post('/', async (req, res) => {
    const challenge = new Challenge({
        user: req.body.user,
        title: req.body.title,
        description: req.body.description,
        status: req.body.status
    });

    try {
        const newChallenge = await challenge.save();
        res.status(201).json(newChallenge);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update one challenge
router.patch('/:id', getChallenge, async (req, res) => {
    if (req.body.title != null) {
        res.challenge.title = req.body.title;
    }
    if (req.body.description != null) {
        res.challenge.description = req.body.description;
    }
    if (req.body.status != null) {
        res.challenge.status = req.body.status;
    }

    try {
        const updatedChallenge = await res.challenge.save();
        res.json(updatedChallenge);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete one challenge
router.delete('/:id', getChallenge, async (req, res) => {
    try {
        await res.challenge.remove();
        res.json({ message: 'Deleted Challenge' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Middleware function for getting challenge by ID
async function getChallenge(req, res, next) {
    let challenge;
    try {
        challenge = await Challenge.findById(req.params.id);
        if (challenge == null) {
            return res.status(404).json({ message: 'Cannot find challenge' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.challenge = challenge;
    next();
}

module.exports = router;
