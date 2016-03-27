import {chunk, range, sampleSize, isUndefined} from "lodash";

import * as types from "./action-types";

const initialState = {
  cells: [["..."]],
  cellsClicked: [],
};

export default function reducer(state, action) {
  if (isUndefined(state)) {
    return initialState;
  }

  const {type, payload} = action;

  switch (type) {
      case types.CLICK_CELL:
          return {
              ...state,
              cellsClicked: state.cellsClicked.concat({
                  ...payload,
                  number: state.cells[payload.y][payload.x]
              })
          }

      case types.SET_BOARD:
          return {
              ...state,
              cells: payload,
              cellsClicked: []
          }

      case types.BALL_CALLED:
        return state;
        
      default:
        throw `Invalid action: ${action.type}`;      
  }
}
