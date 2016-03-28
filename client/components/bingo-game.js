import React from 'react';
import {connect} from 'react-redux';
import {isEqual} from 'lodash';

import BingoCell from './bingo-cell';
import {clickCell} from '../actions';

class BingoGame extends React.Component {
    constructor(props) {
        super(props);
    }
    
    alreadyClicked(cell) {
        const {cellsClicked} = this.props;
        return !!cellsClicked.filter(c => 
            isEqual(c, cell)).length;
    }
    
    render() {
        return (
        <div>
           {this.renderBallsCalled()}
           
           {this.renderCells()}
           
           {this.renderBingoButton()}
        </div>
        );    
    }
    
    renderCells() {
        const {onCellClick} = this.props;

        return this.props.cells.map((row, y) =>
        <div key={y} className="row bingo-cell-row">
            {row.map((number, x) => 
                <BingoCell 
                    key={x} 
                    x={x}
                    y={y}
                    clickable={y > 0 && (y !== 3 || x !== 2)}
                    alreadyClicked={this.alreadyClicked({ x, y, number })}
                    number={number}
                    onClick={e => {
                        e.preventDefault();
                        onCellClick(x, y)
                    }}
                />
            )}
        </div>
        );     
    }
    
    renderBingoButton() {
        return (
        <div className="row bingo-button-row">
            <button type="button" className="col-xs-offset-4 col-xs-4 btn btn-primary btn-lg">BINGO!</button>
        </div>
        );
    }
    
    renderBallsCalled() {
        const {ballsCalled} = this.props;
        const lastIndex = ballsCalled.length - 1;
        return (
        <div className="row bingo-balls-row">
            {ballsCalled.map((ball, i) => i === lastIndex
                ? <span className="label label-pill label-success">{ball}</span>
                : <span className="label label-pill label-primary">{ball}</span>
            )}
        </div>
        );
    }
}

const mapStateToProps = state => ({
   cells: state.cells,
   cellsClicked: state.cellsClicked,
   ballsCalled: state.ballsCalled
});

const mapDispatchToProps = dispatch => ({
    onCellClick: (x, y) => {
        dispatch(clickCell(x, y));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BingoGame);