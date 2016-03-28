import React from "react";
import {connect} from 'react-redux';

import {joinGame} from "../actions";
import BingoGame from "./bingo-game";

class BingoIndex extends React.Component {
    constructor(props) {
        super(props);
    }
    
    begin() {
        store.dispatch(joinGame(0));
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
                    <a href="#" 
                       onClick={this.props.onPlayClick} 
                       className="nav-link">Play</a>
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

const mapStateToProps = state => ({ });

const mapDispatchToProps = dispatch => ({
    onPlayClick() {
        dispatch(joinGame(0));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BingoIndex);