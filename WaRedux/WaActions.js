import ActionTypes from './actionTypes';

export const WaUserAction = userinfo => {
  return async dispatch => {
    dispatch({
      type: ActionTypes.USER_INFO,
      payload: userinfo,
    });
  };
};

export const WasetCurrentProductAction = productInfo => {
  return async dispatch => {
    dispatch({
      type: ActionTypes.SET_CURRENT_PRODUCT,
      payload: productInfo,
    });
  };
};

export const WasetFavAction = favItem => {
  return async dispatch => {
    dispatch({
      type: ActionTypes.SET_FAVOURITE,
      payload: favItem,
    });
  };
};

export const WaremoveFavAction = itemId => {
  return async dispatch => {
    dispatch({
      type: ActionTypes.REMOVE_FAVOURITE,
      payload: itemId,
    });
  };
};

export const WaaddCartAction = item => {
  return async dispatch => {
    dispatch({
      type: ActionTypes.ADD_ITEM_CART,
      payload: item,
    });
  };
};

export const WaremoveCartAction = item => {
  return async dispatch => {
    dispatch({
      type: ActionTypes.REMOVE_ITEM_CART,
      payload: item,
    });
  };
};

export const WaresetCart = () => {
  return async dispatch => {
    dispatch({
      type: ActionTypes.RESET_CART,
    });
  };
};
