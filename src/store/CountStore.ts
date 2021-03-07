import {Store} from "./GenericStore";

interface CountState extends Object {
    count: number
}

class CountStore extends Store<CountState> 
{
    protected data(): CountState {
        return {
            count: 0
        };
    }
    
    incrementCount() {
        this.state.count++;
    }
    
    incrementAsync() {
        setTimeout(()=>this.incrementCount(),1000);
    }
}

export const countStore: CountStore = new CountStore;
