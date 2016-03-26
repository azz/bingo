import React, {PropTypes} from 'react';
import {clone} from 'lodash';

const cellStyle = {
    textAlign: 'center',
};

class BingoCell extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        const {x, onClick, clickable, alreadyClicked} = this.props;

        let css = ["col-xs-2", "bingo-cell"];
        if (x === 0)
            css.push("col-xs-offset-1");        
        return ((clickable && !alreadyClicked)
            ? <a href="#"
                 style={cellStyle} 
                 className={css.join(' ')}
                 onClick={onClick}>                
                 {this.renderInner()}
              </a>
           : <span
                 style={cellStyle} 
                 className={css.join(' ')}>
                 {this.renderInner()}
             </span>
        );
    }
    
    renderInner() {
        const {number} = this.props;
        
        return number === null 
            ? <h6 className="vcenter">2FREE<br/>SPACE</h6>
            : <h3 className="vcenter">{number}</h3>;        
    }
};

BingoCell.PropTypes = {
    number: PropTypes.number.isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    clickable: PropTypes.bool.isRequired,
    alreadyClicked: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired
};

export default BingoCell;