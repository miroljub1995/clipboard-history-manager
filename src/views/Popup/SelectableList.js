import React, { Component } from 'react';
import './SelectableList.css';
import ListItem from './ListItem';

class SelectableList extends Component {
    constructor(props) {
        super(props);

        document.onkeydown = (e) => {
            const { items, selectedIndex, onSelect } = this.props;

            const keyDown = 40;
            const keyUp = 38;

            if (e.keyCode === keyDown && selectedIndex !== items.length - 1) {
                onSelect(selectedIndex + 1);
            }

            if (e.keyCode === keyUp && selectedIndex !== 0) {
                onSelect(selectedIndex - 1);
            }
        }
    }

    handleItemClick = (index) => {
        this.state.onSelect(index);
    }

    render() {
        const { items, selectedIndex } = this.props;
        const listItems = items.map((e, i) => {
            const selected = i === selectedIndex;
            return (<ListItem
                key={i}
                value={e}
                selected={selected}
                onClick={() => this.handleItemClick(i)}
                isLast={i === items.length - 1}
                isFirst={i === 0} />);
        });
        return (
            <div className='container'>
                {listItems}
            </div>);
    }
}



export default SelectableList;