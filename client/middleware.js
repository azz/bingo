import {
    isFunction,
    omit,
    values
} from 'lodash';

export function socketMiddleware(socket, listenTo) {
    return ({ dispatch, getState }) => {
        values(listenTo).forEach(type => {
            socket.on(type, payload => dispatch({ type, payload }));
        });
        
        return next => action => {
            if (isFunction(action)) {
                return action(dispatch, getState);
            }

            if (action.socket) {
                socket.emit(action.type, action.payload);
            }
            
            return next(omit(action, 'socket'));
        };
    };
}
