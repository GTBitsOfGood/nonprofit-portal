import {
  GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING,
} from './types';
import * as itemActions from '../../actions/items';

export const setItemsLoading = () => ({
  type: ITEMS_LOADING,
});

export const getItems = () => (dispatch) => {
  dispatch(setItemsLoading());

  itemActions
    .getItems()
    .then((res) => dispatch({
      type: GET_ITEMS,
      payload: res,
    }));
};

export const addItem = (item) => (dispatch) => {
  itemActions
    .addItem(item)
    .then((res) => dispatch({
      type: ADD_ITEM,
      payload: res,
    }));
};

export const deleteItem = (id) => (dispatch) => {
  itemActions
    .deleteItem(id)
    .then(() => dispatch({
      type: DELETE_ITEM,
      payload: id,
    }));
};
