import React, { Component } from 'react';
import './SelectableList.css';
import ListItem from './ListItem';

class SelectableList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: props.items,
            selectedIndex: 0,
        }
    }

    componentDidUpdate(lastProps) {
        if (lastProps.items !== this.props.items) {
            this.setState({ items: this.props.items });
        }
        if (lastProps.selectedIndex !== this.props.selectedIndex) {
            this.setState({ selectedIndex: this.props.selectedIndex });
        }
    }

    render() {
        const { items, selectedIndex } = this.state;
        const listItems = items.map((e, i) => {
            return (<ListItem key={i} value={e} selected={i === selectedIndex} />);
        });
        return (
            <div>
                {listItems}
            </div>);
    }
}

export default SelectableList;