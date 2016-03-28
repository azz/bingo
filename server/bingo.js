"use strict";

const _ = require('lodash');

let activeGames = [{
    id: 0,
    name: "Global game",
    participants: [],
    ballsCalled: [],
    ballsLeft: _.range(1, 75),
}];

function generateBoard() {
    const dimensions = { width: 5, height: 5 };
    const cells = [
        "BINGO".split(''),
        ..._(_.range(1, 76))
            .sampleSize(dimensions.width * dimensions.height)
            .chunk(dimensions.width)
            .value()
    ];
    cells[3][2] = null; // free space
    
    return cells;
}

module.exports = (io, express) => {
    function callBallForEachGame() {
        activeGames.forEach(callBall);
    }
        
    function callBall(game) {
        if (game.participants.length && game.ballsLeft.length) {
            const ball = _.sample(game.ballsLeft);
            _.pull(game.ballsLeft, ball);
            game.ballsCalled.push(ball);
            console.log(`ball number ${ball}!`);
            io.emit('ball.call', [ball]);
        }
    }

    io.on('connection', socket => {
        function socketDisconnect(user) {
            const game = _.find(
                activeGames,
                game => _.includes(game.participants, user)
            );
            game && leaveGame(user, game);
        }

        function socketJoinGame(gameId, user) {
            (gameId in activeGames) && joinGame(user, activeGames[gameId]);
        }

        function socketCreateGame() {
            console.error("Unimplemented");
        }
        
        function socketBingo(user) {
            console.log(`player ${user} called bingo!`);
        }

        function getCalledBalls(game) {
            return game.ballsCalled;
        }

        function joinGame(user, game) {
            console.log(`player "${user}" joined game ${game.id}"`);
            game.participants.push(user);
            socket.emit('board.set', generateBoard());
            socket.emit('ball.call', getCalledBalls(game));
        }

        function leaveGame(user, game) {
            console.log(`player "${user}" left game ${game.id}"`);
            _.pull(game.participants, user);
        }
        
        socket.on('disconnect', 
            () => socketDisconnect(socket.id));

        socket.on('game.new', socketCreateGame);

        socket.on('game.join', 
            gameId => socketJoinGame(gameId, socket.id));
            
        socket.on('game.bingo', () => socketBingo(socket.id));
    });
    
    return {
        tick: callBallForEachGame
    };
};