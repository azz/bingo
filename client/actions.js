import {
    CLICK_CELL,
    SET_BOARD,
    BALL_CALLED
} from './action-types';

export function clickCell(x, y) {
    return {
        type: CLICK_CELL,
        payload: { x, y }
    };
}

export function setBoard(board) {
    return {
        type: SET_BOARD,
        payload: board
    }
}

export function callBall(ball) {
    return {
        type: BALL_CALLED,
        payload: ball
    }
}
