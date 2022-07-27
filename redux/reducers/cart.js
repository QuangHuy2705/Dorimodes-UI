/* eslint-disable no-param-reassign */
import { createActions, createReducer } from "reduxsauce";
import produce from "immer";
import func from "../../utils/func";
import _ from "lodash";

/* ------------- Types and Action Creators ------------- */
const { Types, Creators: Actions } = createActions(
  {
    loadCart: ["arrData"],
    addToCart: ["data"],
    changeProductCart: ["actionType", "data"],
    removeFromCart: ["index"],
    removeAllCart: [],
  },
  { prefix: "@CART/" }
);

export { Types, Actions };

const INITIAL_STATE = {
  isFetching: false,
  isRefreshing: false,
  carts: [],
};

export default createReducer(INITIAL_STATE, {
  [Types.ADD_TO_CART]: (state, { data }) =>
    produce(state, (draft) => {
      draft.isFetching = true;
      draft.error = null;
      data = {
        ...data,
        price: parseFloat(data.price),
      };
      if (!_.isEmpty(draft.carts)) {
        const findIndex = draft.carts.findIndex((item) => item.id === data.id);
        if (findIndex > -1) {
          draft.carts[findIndex].quantity =
            draft.carts[findIndex].quantity + data.quantity;
          draft.carts[findIndex].price =
            parseFloat(draft.carts[findIndex].price || 0) +
            parseFloat(data.price || 0);
          draft.carts[findIndex].itemQuantity =
            draft.carts[findIndex].itemQuantity || 1 + data.itemQuantity || 1;
        } else {
          draft.carts = [...draft.carts, data];
        }
      } else {
        draft.carts = [data];
      }
      func.addToCart(data);
      func.notificationAlert(
        "success",
        "Notification",
        "Cart added successfully! \n Please go to cart to view details "
      );
    }),
  [Types.LOAD_CART]: (state, { arrData }) =>
    produce(state, (draft) => {
      draft.isFetching = true;
      draft.error = null;
      draft.carts = arrData;
    }),

  [Types.CHANGE_PRODUCT_CART]: (state, { actionType, data }) =>
    produce(state, (draft) => {
      const findIndex = draft.carts.findIndex((item) => item.id === data.id);
      if (actionType === "plus") {
        draft.carts[findIndex].quantity = draft.carts[findIndex].quantity + 1;
        func.addToCart({
          ...data,
          quantity: 1,
          itemQuantity: 0,
          price: 0,
        });
      }
      if (actionType === "minus") {
        if (draft.carts[findIndex].quantity - 1 === 0) {
          func.removeItemFromCart(findIndex);
          draft.carts = draft.carts.filter((item) => item.id !== data.id);
        } else {
          draft.carts[findIndex].quantity = draft.carts[findIndex].quantity - 1;
          func.addToCart({
            ...data,
            quantity: -1,
            itemQuantity: 0,
            price: 0,
          });
        }
      }
    }),

  [Types.REMOVE_FROM_CART]: (state, { index }) =>
    produce(state, (draft) => {
      draft.isFetching = false;
      if (index > -1) {
        draft.carts.splice(index, 1);
      }
      func.removeItemFromCart(index);
    }),

  [Types.REMOVE_ALL_CART]: (state) =>
    produce(state, (draft) => {
      draft.isFetching = false;
      draft.carts = [];
      func.removeAllCart();
    }),
});
