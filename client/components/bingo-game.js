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
        const {onCellClick} = this.props;
        
        return (
        <div>
            {this.props.cells.map((row, y) =>
            <div key={y} className="row">
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
}

const mapStateToProps = state => ({
   cells: state.cells,
   cellsClicked: state.cellsClicked
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