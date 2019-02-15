import React from 'react';
import './ListItem.css';

const ListItem = ({ value, selected }) => (
    <p className={selected ? "selected" : undefined}>{value}</p>
);

export default ListItem;