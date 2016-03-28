import {createStore, compose, applyMiddleware} from "redux";
import {root, reducerTypes} from "./reducers";
import {socketMiddleware} from "./middleware";

const finalCreateStore = ({ socket }) => compose(
    applyMiddleware(socketMiddleware(socket, reducerTypes()))
)(createStore);

export default function configureStore(opts) {
    const store = finalCreateStore(opts)(
        root, 
        void 0,
        window.devToolsExtension ? window.devToolsExtension() : f => f
    );

    if (module.hot) {
        module.hot.accept('./reducers', () => {
            const nextRootReducer = require('./reducers').root;
            store.replaceReducer(nextRootReducer);
        });
    }
    
    return store;
}
