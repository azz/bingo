"use strict";


const path = require('path');
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const _ = require('lodash');

const port = 3210;

let activeGames = [{
    id: 0,
    name: "Global game",
    participants: [],
    ballsCalled: [],
    ballsLeft: _.range(1, 75),
}];

function generateBoard() {
    const cells = ["BINGO".split('')];
    cells.push(..._(_.range(1, 76)).sampleSize(5*5).chunk(5).value());
    cells[3][2] = null; // free space
    
    return cells;    
}

function callBall(game) {
    if (game.participants.length && game.ballsLeft.length) {        
        const ball = _.sample(game.ballsLeft);
        _.pull(game.ballsLeft, ball);
        game.ballsCalled.push(ball);
        console.log(`ball number ${ball}!`);
        io.emit('new-ball', ball);
    }
}

function joinGame(socket, gameId) {
    console.log(`player "${socket.id}" joined game ${gameId}"`);  
    activeGames[gameId].participants.push(socket.id);
    socket.emit('board', generateBoard());
}

function leaveGame(socket, game) {
    console.log(`player "${socket.id}" left game ${game.id}"`);  
    _.pull(game.participants, socket.id);
}

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../static/index.html'));
});
app.use('/', express.static(path.resolve(__dirname, '../static')));

http.listen(port, () => {
    console.log(`listening on *:${port}`);
});

let interval = setInterval(() => {
    activeGames.forEach(callBall);
}, 5000);

io.on('connection', socket => {    
    socket.on('disconnect', () => {
        const game = _.find(
            activeGames, 
            game => _.includes(game.participants, socket.id)
        );
        game && leaveGame(socket, game);  
    });

    socket.on('create-game', () => {
        
    });
  
    socket.on('join-game', gameId => {        
        (gameId in activeGames) && joinGame(socket, gameId);
    });
});
