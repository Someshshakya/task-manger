const express = require("express");
const cors = require('cors');
require("dotenv").config();

const usersRouter = require("../routes/users");
const taskRouter = require("../routes/tasks");
const mongodb = require("../library/mongodb");

const app = express();

const port = process.env.PORT;
app.use(express.json());
app.use(cors());

const apiPrefix = `/${process.env.VERSION}/api`;
app.use(`${apiPrefix}/users`, usersRouter);
app.use(`${apiPrefix}/tasks`, taskRouter);

// Favicon route
app.get('/favicon.ico', (req, res) => res.status(204).end());

// Health check route
app.get('/health', (req, res) => {
    res.status(200).json({ message: `This is healthy ${new Date()}` });
});

// Connect to MongoDB before handling requests
let isDbConnected = false;
app.use(async (req, res, next) => {
    if (!isDbConnected) {
        try {
            await mongodb.connect();
            isDbConnected = true;
        } catch (err) {
            return res.status(500).json({ error: 'Failed to connect to database', details: err.message });
        }
    }
    next();
});

module.exports = app; 