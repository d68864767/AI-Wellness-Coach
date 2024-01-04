const express = require('express');
const Activity = require('./models/Activity');
const User = require('./models/User');

const router = express.Router();

// Get all activities
router.get('/', async (req, res) => {
    try {
        const activities = await Activity.find();
        res.json(activities);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get one activity
router.get('/:id', getActivity, (req, res) => {
    res.json(res.activity);
});

// Create one activity
router.post('/', async (req, res) => {
    const activity = new Activity({
        user: req.body.user,
        type: req.body.type,
        duration: req.body.duration,
        mood: req.body.mood,
        notes: req.body.notes
    });

    try {
        const newActivity = await activity.save();
        res.status(201).json(newActivity);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update one activity
router.patch('/:id', getActivity, async (req, res) => {
    if (req.body.type != null) {
        res.activity.type = req.body.type;
    }
    if (req.body.duration != null) {
        res.activity.duration = req.body.duration;
    }
    if (req.body.mood != null) {
        res.activity.mood = req.body.mood;
    }
    if (req.body.notes != null) {
        res.activity.notes = req.body.notes;
    }

    try {
        const updatedActivity = await res.activity.save();
        res.json(updatedActivity);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete one activity
router.delete('/:id', getActivity, async (req, res) => {
    try {
        await res.activity.remove();
        res.json({ message: 'Deleted Activity' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Middleware function for getting activity by ID
async function getActivity(req, res, next) {
    let activity;
    try {
        activity = await Activity.findById(req.params.id);
        if (activity == null) {
            return res.status(404).json({ message: 'Cannot find activity' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.activity = activity;
    next();
}

module.exports = router;
