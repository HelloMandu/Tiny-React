
export const createStore = (reducer, middlewares = []) => {
  let store;
  const handler = []

  const dispatch = (action) => {
    store = reducer(store, action)
    handler.forEach((listener) => listener())
  }

  const getState = () => store

  const subscribe = (listener) =>
    handler.push(listener)

  middlewares = Array.from(middlewares).reverse()
  let lastDispatch = dispatch

  middlewares.forEach((middleware) => {
    lastDispatch = middleware(store)(lastDispatch);
  });


  return {
    dispatch: lastDispatch,
    getState,
    subscribe
  }
}