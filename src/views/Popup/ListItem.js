import React, { Component } from 'react';
import './ListItem.css';


class ListItem extends Component {
    componentDidMount() {
        this.componentDidUpdate(this.props);
    }

    componentDidUpdate(lastProps) {
        if (this.props.selected) {
            this.scrollElementIntoCenterOfView(this.element);
        }
    }

    scrollElementIntoCenterOfView = (element) => {
        let isScrolledToBottom = (window.innerHeight + window.pageYOffset) >= document.body.offsetHeight;
        let isScrolledToTop = window.pageXOffsetX === 0;
        if (isScrolledToTop && isScrolledToBottom) {
            return;
        }

        let viewportOffset = element.getBoundingClientRect();
        let top = viewportOffset.top;
        let bottom = viewportOffset.bottom;
        const marginFromEdge = 20;
        if (!isScrolledToTop && top < marginFromEdge) {
            window.scrollBy({ left: 0, top: top - marginFromEdge, behavior: "auto" });
        }
        else if (bottom > window.innerHeight - marginFromEdge) {
            window.scrollBy({ left: 0, top: bottom - (window.innerHeight - marginFromEdge), behavior: "auto" });
        }
    }

    handleMouseClick = () => {
        if(this.props.onClick) {
            this.props.onClick();
        }
    }

    render() {
        const { value, selected, isLast, isFirst } = this.props;
        let className = "item";
        className = selected ? className + " selected" : className;
        className = isLast ? className + " last" : className;
        className = isFirst ? className + " first" : className;
        return (
            <pre ref={e => (this.element = e)} className={className} onClick={this.handleMouseClick}>
                {transformForView(value).split('\n').join('\\n\n')}
            </pre>
        );
    }
}

const commonPrefix = (strings) => {
    let sortedStrings = strings.concat().sort();
    let first = sortedStrings[0]
    let end = sortedStrings[sortedStrings.length - 1]
    let length = first.length
    let i = 0;
    while (i < length && first.charAt(i) === end.charAt(i))
        i++;
    return first.substring(0, i);
}

const transformForView = (string) => {
    let lines = string.split('\n');
    let commPrefix = commonPrefix(lines)
    let spaces = commPrefix.match(/^[ ]+/);
    if (!spaces) {
        return lines.join('\n');
    }
    lines = lines.map(line => line.substr(spaces.length ? spaces.length : 0));
    return lines.join('\n');
}

export default ListItem;