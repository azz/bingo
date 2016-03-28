import React from 'react'; window.React = React;
import {connect} from 'react-redux';
import {isEqual} from 'lodash';

import BingoCell from './bingo-cell';
import {clickCell, clickBingo} from '../actions';

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
           {this.renderBingoButton()}
            <div className="row">
                {this.renderCells()}
                {this.renderBallsCalled()}
            </div>
        </div>
        );
    }
    
    renderCells() {
        const {onCellClick} = this.props;

        return (
        <div className="col-xs-12 col-lg-8">
            {this.props.cells.map((row, y) =>
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
            )}
        </div>
        );
    }
    
    renderBingoButton() {
        const {onBingoClick} = this.props;
        return (
        <div className="row bingo-button-row">
            <button type="button" onClick={onBingoClick} className="col-xs-offset-4 col-xs-4 btn btn-primary btn-lg">BINGO!</button>
        </div>
        );
    }
    
    renderBallsCalled() {
        const {ballsCalled} = this.props;
        const lastIndex = ballsCalled.length - 1;
        return (
        <div className="col-xs-12 col-lg-4 bingo-balls">
            {ballsCalled.map((ball, i) => i === lastIndex
                ? <span key={i} className="label label-pill label-success">{ball}</span>
                : <span key={i} className="label label-pill label-primary">{ball}</span>
            )}
        </div>
        );
    }
}

const mapStateToProps = state => ({
   cells: state.board.cells,
   cellsClicked: state.board.clicked,
   ballsCalled: state.ball.called
});

const mapDispatchToProps = dispatch => ({
    onCellClick: (x, y) => {
        dispatch(clickCell(x, y));
    },
    onBingoClick: () => {
        dispatch(clickBingo());
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BingoGame);