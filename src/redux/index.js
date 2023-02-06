import { createStore } from "./redux.js";

const COUNTER = 'count'

const middleware = (store) => (next) => (action) => {
  setTimeout(() => {
    console.log(1)
    next(action)
  }, 1000)
}

const middleware2 = (store) => (next) => (action) => {
  setTimeout(() => {
    console.log(2)
    next(action)
  }, 1000)
}

const reducer = (state, action) => {
  if (action.type === COUNTER) {
    return {...state, count: action.payload.count };
  }
  return state;
}

const store = createStore(reducer,[middleware, middleware2]);

store.dispatch({type: COUNTER, payload: { count: 1 }})
store.subscribe(() => console.log(store.getState()))
