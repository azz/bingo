"use strict";

const port = 3210;

const express = require('./express')(port);
const io = require('socket.io')(express.server);
const bingo = require('./bingo')(io, express);

let interval = setInterval(bingo.tick, 5000);
