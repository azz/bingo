import {createStore} from "redux";
import reducer from "./reducers";

export function finalCreateStore() {
    const store = createStore(
        reducer, 
        void 0,
        window.devToolsExtension ? window.devToolsExtension() : f => f
    );

    if (module.hot) {
        module.hot.accept('./reducers', () => {
            const nextRootReducer = require('./reducers');
            store.replaceReducer(nextRootReducer);
        });
    }
    
    return store;
}

