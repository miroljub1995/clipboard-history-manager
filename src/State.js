class State {
    clipboards = [];
    limit = 20;

    add = (clipboard) => {
        this.clipboards.unshift(clipboard);
        if (this.clipboards.length > this.limit) {
            this.clipboards.pop();
        }
    }

    commitSelect = (index) => {
        let clipboard = this.clipboards[index];
        this.clipboards.splice(index);
        this.clipboards.unshift(clipboard);
    }

    first = () => {
        if (this.clipboards.length > 0) {
            return this.clipboards[0];
        }
        return null;
    }
}

export default State;