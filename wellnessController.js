const express = require('express');
const WellnessSession = require('./models/WellnessSession');
const User = require('./models/User');
const openaiAPI = require('./openaiAPI');

const router = express.Router();

// Get all wellness sessions
router.get('/', async (req, res) => {
    try {
        const wellnessSessions = await WellnessSession.find();
        res.json(wellnessSessions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get one wellness session
router.get('/:id', getWellnessSession, (req, res) => {
    res.json(res.wellnessSession);
});

// Create one wellness session
router.post('/', async (req, res) => {
    const prompt = req.body.prompt;
    const aiResponse = await openaiAPI.generateResponse(prompt);

    const wellnessSession = new WellnessSession({
        user: req.body.user,
        prompt: prompt,
        aiResponse: aiResponse
    });

    try {
        const newWellnessSession = await wellnessSession.save();
        res.status(201).json(newWellnessSession);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update one wellness session
router.patch('/:id', getWellnessSession, async (req, res) => {
    if (req.body.prompt != null) {
        res.wellnessSession.prompt = req.body.prompt;
        res.wellnessSession.aiResponse = await openaiAPI.generateResponse(req.body.prompt);
    }

    try {
        const updatedWellnessSession = await res.wellnessSession.save();
        res.json(updatedWellnessSession);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete one wellness session
router.delete('/:id', getWellnessSession, async (req, res) => {
    try {
        await res.wellnessSession.remove();
        res.json({ message: 'Deleted Wellness Session' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Middleware function for getting wellness session by ID
async function getWellnessSession(req, res, next) {
    let wellnessSession;
    try {
        wellnessSession = await WellnessSession.findById(req.params.id);
        if (wellnessSession == null) {
            return res.status(404).json({ message: 'Cannot find wellness session' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.wellnessSession = wellnessSession;
    next();
}

module.exports = router;
