This example show how to make a store and following the flux-architecture in vue3 and without vuex

The idea from is coming from:
https://medium.com/@mario.brendel1990/vue-3-the-new-store-a7569d4a546f

It basicly means that vuex become useless in vue3...

Here is the gist:

```
import {reactive, readonly} from 'vue';

export abstract class Store<T extends Object> {
    protected state: T;

    constructor() {
        let data = this.data();
        this.setup(data);
        this.state = reactive(data) as T;
    }

    protected abstract data(): T

    protected setup(data: T): void {}

    public getState(): T {
        return readonly(this.state) as T
    }
}

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
```

Unlike vuex, our state object is strongly typed, and the same for mutation / action methods.

```
import {countStore} from '../store/CountStore';
setup: () => {
    let currentCount = computed(()=>countStore.getState().count);
    return { currentCount, incrementCount}
},
function onClick() {
    countStore.incrementAsync();
}
```

# Vue 3 + Typescript + Vite

This template should help get you started developing with Vue 3 and Typescript in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Vetur](https://marketplace.visualstudio.com/items?itemName=octref.vetur). Make sure to enable `vetur.experimental.templateInterpolationService` in settings!

### If Using `<script setup>`

[`<script setup>`](https://github.com/vuejs/rfcs/pull/227) is a feature that is currently in RFC stage. To get proper IDE support for the syntax, use [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar) instead of Vetur (and disable Vetur).

## Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can use the following:

### If Using Volar

Run `Volar: Switch TS Plugin on/off` from VSCode command palette.

### If Using Vetur

1. Install and add `@vuedx/typescript-plugin-vue` to the [plugins section](https://www.typescriptlang.org/tsconfig#plugins) in `tsconfig.json`
2. Delete `src/shims-vue.d.ts` as it is no longer needed to provide module info to Typescript
3. Open `src/main.ts` in VSCode
4. Open the VSCode command palette 5. Search and run "Select TypeScript version" -> "Use workspace version"
