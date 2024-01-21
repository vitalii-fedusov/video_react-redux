function amountReducer(amount, action) {
  switch (action.type) {
    case 'add':
      return amount + action.payload;

    case 'take':
      return amount - action.payload;

    case 'clear':
      return 0;

    default:
      return amount;
  }
}

function createStore(reducer, initialState) {
  let callbacks = [];
  let state = initialState;

  return {
    dispatch(action) {
      state = reducer(state, action);
    
      callbacks.forEach(callback => callback());
    },
    subscribe(callback) {
      callbacks.push(callback);
    },
    getState() {
      return state;
    }
  };
}

const { dispatch, subscribe, getState } = createStore(amountReducer, 100);

subscribe(() => {
  const amount = getState();
  console.log(amount);
})

dispatch({ type: 'add', payload: 20 });
dispatch({ type: 'take', payload: 50 });
dispatch({ type: 'add', payload: 40 });
dispatch({ type: 'add', payload: 40 });
dispatch({ type: 'add', payload: 40 });
dispatch({ type: 'add', payload: 40 });
dispatch({ type: 'add', payload: 40 });
dispatch({ type: 'add', payload: 40 });
dispatch({ type: 'clear' });