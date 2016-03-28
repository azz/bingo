import {chunk, range, sampleSize, isUndefined, assign} from "lodash";

import * as types from "./action-types";

const initialState = {
    cells: [["..."]],
    cellsClicked: [],
    ballsCalled: [],
};

export default function reducer(state, action) {
    if (isUndefined(state)) {
        return initialState;
    }

    const {type, payload} = action;

    switch (type) {
        case types.CLICK_CELL:
            return assign({}, state, {
                cellsClicked: state.cellsClicked.concat(assign({}, payload, {
                    number: state.cells[payload.y][payload.x]
                }))
            });

        case types.SET_BOARD:
            return assign({}, state, {
                cells: payload,
                cellsClicked: []
            });

        case types.BALL_CALLED:
            return assign({}, state, {
                ballsCalled: state.ballsCalled.concat(payload)
            });

        default:
            throw `Invalid action: ${action.type}`;      
    }
}
