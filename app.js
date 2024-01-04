const express = require('express');
const mongoose = require('mongoose');
const openaiAPI = require('./openaiAPI');
const userController = require('./userController');
const activityController = require('./activityController');
const wellnessController = require('./wellnessController');
const challengeController = require('./challengeController');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/ai-wellness-coach', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

// Middleware for parsing request body
app.use(express.json());

// OpenAI API setup
openaiAPI.setup();

// User routes
app.use('/api/users', userController);

// Activity routes
app.use('/api/activities', activityController);

// Wellness session routes
app.use('/api/wellness-sessions', wellnessController);

// Challenge routes
app.use('/api/challenges', challengeController);

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));

module.exports = app;
const express = require('express');
const mongoose = require('mongoose');
const openaiAPI = require('./openaiAPI');
const userController = require('./userController');
const activityController = require('./activityController');
const wellnessController = require('./wellnessController');
const challengeController = require('./challengeController');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/ai-wellness-coach', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

// Middleware for parsing request body
app.use(express.json());

// OpenAI API setup
openaiAPI.setup();

// User routes
app.use('/api/users', userController);

// Activity routes
app.use('/api/activities', activityController);

// Wellness session routes
app.use('/api/wellness-sessions', wellnessController);

// Challenge routes
app.use('/api/challenges', challengeController);

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));

module.exports = app;
