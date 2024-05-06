// Import required modules
const express = require('express'); // Import Express.js framework
const redis = require('redis'); // Import Redis client

// Create an Express application
const app = express();

// Create a Redis client
const client = redis.createClient();

// Initialize visits count to 0 in Redis
client.set('visits', 0);

// Define a route handler for GET requests to '/'
app.get('/', (req, res) => {
    // Retrieve the current visit count from Redis
    client.get('visits', (err, visits) => {
        // Handle errors, if any, from Redis
        if (err) {
            console.error(err);
            return res.status(500).send('Internal Server Error');
        }
        
        // Send the response with the current visit count
        res.send('Number of visits is ' + visits);
        
        // Increment the visit count in Redis
        client.set('visits', parseInt(visits) + 1);
    });
});

// Start the Express application on port 8081
app.listen(8081, () => {
    console.log('Listening on port 8081'); // Log a message when the server starts listening
});


