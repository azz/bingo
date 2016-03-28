import {
    isUndefined,
    isObject,
    isFunction,
    cloneDeep,
    flattenDeep,
    assign,
    keys,
    get,
    set,
    flatMap,
    dropRight
} from "lodash";

const reducers = {
    game: {
        join(state, gameId) {
            return state
        },
        bingo(state) {
            return state;
        },
    },
    ball: {
        _initialState: {
            called: []
        },
        call(state, balls) {
            return assign(state, {
                called: state.called.concat(balls)
            })
        },
    },
    board: {
        _initialState: {
            cells: ["HELLO".split('')],
            clicked: [],
        },
        set(state, cells) {
            return assign((state), { cells });
        },
        clickCell(state, cell /*: { x, y }*/) {
            return assign(state, {
                clicked: state.clicked.concat(assign({}, cell, {
                    number: state.cells[cell.y][cell.x]
                }))
            })
        },
    },
}

console.log(initialState());

function keysForLevel(level) {
    return keys(level).filter(key => key[0] != '_');
}

export function reducerTypes(level = reducers, path = []) {
    return flatMap(keysForLevel(level), key => {
        if (!isFunction(level[key]) && isObject(level[key])) {
            return reducerTypes(level[key], path.concat(key));
        } else {
            return path.concat(key).join('.');
        }
    });
}

function initialState(state = {}, level = reducers) {
    keysForLevel(level).forEach(key => {
        if (!isFunction(level[key]) && isObject(level[key])) {
            if (!isUndefined(level[key]._initialState)) {
                state[key] = level[key]._initialState;
            }
            initialState(state[key], level[key]);
        }
    });
    return state;
}

export function root(state, { type, payload }) {

    if (isUndefined(state)) {
        return initialState();
    }

    const clonedState = cloneDeep(state);

    // pick the reducer by traversing the dotted path in type
    const reducer = get(reducers, type);

    // remove the last section of the path
    const path = dropRight(type.split('.'));

    // call the reducer with the state at the path
    const nextState = reducer(get(state, path), payload);
    
    // update the state
    return set(clonedState, path, nextState)
}
