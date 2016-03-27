"use strict";

const path = require('path');
const express = require('express');
const http = require('http');

module.exports = createServer;

function createServer(port) {
    port = port || 3000;
    const app = express();    
    const server = http.Server(app);

    app.get('/', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../static/index.html'));
    });
    app.use('/', express.static(path.resolve(__dirname, '../static')));

    server.listen(port, () => console.log(`listening on *:${port}`));
    
    return { server, app, port };
}
