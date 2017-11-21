const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');


const app = express();

// Initialize a simple http server
const server = http.createServer(app);

// Initialize WebSocket server instance
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {

    // Ping messages to identify broken connections
    ws.isAlive = true;
    ws.on('pong', () => { ws.isAlive = true; });

    // Connection is up - ready to recieve messages
    ws.on('message', (message) => {

        // Log the received message -> send it back to the client
        console.info(`received: ${message}`);
        ws.send(`You sent -> ${message}`);
    });

    ws.on('message', (message) => {

        // Connection is up - ready to recieve messages
        console.info(`received: ${message}`);

        // Regex to identify brodcast messages
        const broadcastRegex = /^broadcast\:/;
        if (broadcastRegex.test(message)) {
            message = message.replace(broadcastRegex, '');

            //send back the message to the other clients
            wss.clients
                .forEach(client => {
                    if (client != ws) {
                        client.send(`[Broadcast] ${message}`);
                    }
                });

        } else {
            // Normal client-server messages
            ws.send(`You sent -> ${message}`);
        }
    });

    // Send feedback to incoming client initial connection   
    ws.send('Connected to WebSocket server...');
});

/**
 * The link between the server and the client can be interrupted in a way that both are unaware of the broken state of the connection
 * To avoid this situation we use ping messages to check if the client is still responsive
 */
setInterval(() => {
    wss.clients.forEach((ws) => {
        if (!ws.isAlive) {
            return ws.terminate();
        }
        
        ws.isAlive = false;
        ws.ping(null, false, true);
    });
}, 2000);  // Check at 10s intervals

const INDEX = path.join(__dirname, 'index.html');
app.get('/', function (req, res) {
    res.sendFile(INDEX);
    // res.send('Using a web-socket client, connect to the following web-socket address: ws://web-socket-app.herokuapp.com/');
});

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.info(`Server started on port ${server.address().port}...`);
});