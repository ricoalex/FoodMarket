const initOrder = {
  orders: [],
  inProgress: [],
  postOrders: [],
};

export const orderReducer = (state = initOrder, action) => {
  if (action.type === 'SET_ORDER') {
    return {
      ...state,
      orders: action.value,
    };
  }
  if (action.type === 'SET_IN_PROGRESS') {
    return {
      ...state,
      inProgress: action.value,
    };
  }
  if (action.type === 'SET_POST_ORDERS') {
    return {
      ...state,
      postOrders: action.value,
    };
  }
  return state;
};
