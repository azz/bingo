import {
    isFunction,
    omit,
    values
} from 'lodash';

let timeouts = [];

export function socketMiddleware(socket, listenTo) {
    return ({ dispatch, getState }) => {
        values(listenTo).forEach(type => {
            socket.on(type, payload => {
                dispatch({ type, payload })
                
                timeouts.forEach((timeout, i) => {
                    if (timeout.type === type) {
                        clearTimeout(timeout.handle);
                        if (timeout.onCancel)
                            dispatch(timeout.onCancel);
                        timeouts.splice(i, 1);
                    }
                });
            });
        });
        
        return next => action => {
            if (isFunction(action)) {
                return action(dispatch, getState);
            }

            if (action.waitFor) {
                const dispatchTimeout = () => {
                    if (action.onTimeout)
                        dispatch(action.onTimeout);
                };
                timeouts.push({
                    type: action.waitFor,
                    handle: setTimeout(dispatchTimeout, action.timeout)
                });
            }

            if (action.socket) {
                socket.emit(action.type, action.payload);
            }
            
            return next(omit(action, 'socket'));
        };
    };
}
