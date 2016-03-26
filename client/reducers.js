import {chunk, range, sampleSize, isUndefined} from "lodash";

import * as types from "./action-types";

const cells = ["BINGO".split('')];
cells.push(...chunk(sampleSize(range(1, 75), 5*5), 5));
cells[3][2] = null; // free space

const initialState = {
  cells,
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
      default:
        throw `Invalid action: ${action.type}`;      
  }
}
