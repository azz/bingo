"use strict";

import React from "react"; window.React = React;
import ReactDOM from "react-dom";
import {createStore} from "redux";
import {Provider} from "react-redux";

import "./css/bootstrap.css";
import "./css/styles.css";

import BingoGame from "./components/bingo-game";
import reducer from "./reducers";

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

class BingoApp extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
        <div>
            {this.renderNavbar()}
            
            {this.renderContent()}
        </div>
        );
    }
    
    renderNavbar() {
        return (
        <nav className="navbar navbar-fixed-top navbar-dark bg-inverse">
            <a className="navbar-brand" href="#">Bingo</a>
            <ul className="nav navbar-nav">
                <li className="nav-item active">
                    <a href="#" className="nav-link">Play</a>
                </li>
            </ul>
        </nav>
        );
    }
    
    renderContent() {
        return (
        <div className="container">
            {<BingoGame />}
        </div>
        );
    }
}

ReactDOM.render(
    <Provider store={store}>
        <BingoApp />
    </Provider>, 
    document.getElementById('react')
);