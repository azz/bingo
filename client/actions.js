import {CLICK_CELL} from './action-types';

export function clickCell(x, y) {
    return {
        type: CLICK_CELL,
        payload: { x, y }
    };
}