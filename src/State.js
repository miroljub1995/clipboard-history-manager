class State {
    clipboards = [];
    
    
    add = (clipboard) => {
        this.clipboards.unshift(clipboard);
    }
}

export default State;