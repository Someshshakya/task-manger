const express = require("express");
const cors = require('cors');

const app = express();
const usersRouter = require("./routes/users")
const taskRouter = require("./routes/tasks")
require("dotenv").config();

const mongodb = require("./library/mongodb");
const { error } = require("console");

const port = process.env.PORT
// Middleware to parse JSON bodies
app.use(express.json());

app.use(cors());

// register the routers
const apiPrefix = `/${process.env.VERSION}/api`;

app.use(`${apiPrefix}/users`, usersRouter);
app.use(`${apiPrefix}/tasks`, taskRouter);

// added to for vercel
app.get('/favicon.ico', (req, res) => res.status(204).end());

app.get('/health',(req,res)=>{
    res.status(200).json({message:`This is healthy ${new Date}`})
})
// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err.message);
    console.error('Stack:', err.stack);
    process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at Promise:', promise);
    console.error('Reason:', reason);
    process.exit(1);
});


// Start server function
const startServer = async () => {
    try {
        // Validate required environment variables
        const requiredEnvVars = ['PORT'];
        const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);

        if (missingEnvVars.length > 0 && process.env.NODE_ENV === 'production') {
            throw new Error(`Missing required environment variables: ${missingEnvVars.join(', ')}`);
        }

        // Connect to MongoDB first
        await mongodb.connect();

        // Start the server
        const server = app.listen(port, '0.0.0.0', () => {
            console.log(`Server is running on port ${port}`);
            console.log(`Server URL: http://localhost:${port}`);
            console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
        });

        // Handle server errors
        server.on('error', (err) => {
            if (err.code === 'EADDRINUSE') {
                console.error(`Port ${port} is already in use`);
                process.exit(1);
            } else {
                console.error('Server error:', err);
                process.exit(1);
            }
        });


    } catch (err) {
        console.error('Error while starting server:');
        console.error('Message:', err.message);
        console.error('Stack:', err.stack);

        // Exit with error code
        process.exit(1);
    }
};

// Start the application
startServer();