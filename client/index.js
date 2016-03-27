"use strict";

import React from "react"; window.React = React;
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import io from "socket.io-client";

import "./css/bootstrap.css";
import "./css/styles.css";

import BingoGame from "./components/bingo-game";
import {finalCreateStore} from "./store";

import {setBoard, callBall} from "./actions";

const store = finalCreateStore();
const socket = io();

socket.on('board', board => 
    store.dispatch(setBoard(board)));

socket.on('new-ball', ball => 
    store.dispatch(callBall(ball)));

socket.emit('join-game', 0);

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
            <a className="navbar-brand" href="#">eBingo</a>
            <ul className="nav navbar-nav">
                <li className="nav-item">
                    <a href="#" className="nav-link">Find Games</a>
                </li>
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