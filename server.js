const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

let messages = [];

wss.on('connection', (ws) => {
    console.log('Novo cliente conectado!');

    
    ws.send(JSON.stringify(messages));

    ws.on('message', (message) => {
        console.log('Received:', message);
        const msgObject = { socktid: ws._socket.remoteAddress, mensagem: message };

 
        messages.push(msgObject);

       
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify([msgObject]));
            }
        });
    });

    ws.on('close', () => {
        console.log('Cliente desconectado');
    });
});

app.use(express.static('public'));

server.listen(3000, () => {
    console.log('Server is listening on port 3000');
});
