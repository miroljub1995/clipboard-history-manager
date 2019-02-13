class State {
    prop1 = 7;
    constructor() {
        this.increment.bind(this);
    }
    increment(){
        this.prop1++;
    }
}

export default State;