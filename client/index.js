"use strict";

import React from "react"; 
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import io from "socket.io-client";

import "./css/bootstrap.css";
import "./css/styles.css";

import BingoIndex from "./components/bingo-index";
import configureStore from "./store";

const socket = io();
const store = configureStore({ io, socket });

window.React = React;

ReactDOM.render(
    <Provider store={store}>
        <BingoIndex />
    </Provider>, 
    document.getElementById('react')
);
