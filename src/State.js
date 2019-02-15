class State {
    clipboards = [];
    
    add = (clipboard) => {
        this.clipboards.push(clipboard);
    }
}

export default State;