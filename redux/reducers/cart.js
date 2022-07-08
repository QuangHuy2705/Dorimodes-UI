/* eslint-disable no-param-reassign */
import { createActions, createReducer } from 'reduxsauce'
import produce from 'immer'
import func from '../../utils/func'

/* ------------- Types and Action Creators ------------- */
const { Types, Creators: Actions } = createActions(
    {
        loadCart: ['arrData'],
        addToCart: ['data'],
        removeFromCart: ['id'],
        removeAllCart: [],
    },
    { prefix: '@CART/' }
)

export { Types, Actions }

const INITIAL_STATE = {
    isFetching: false,
    isRefreshing: false,
    carts: []
}

export default createReducer(INITIAL_STATE, {
    [Types.ADD_TO_CART]: (state, { data }) =>
        produce(state, draft => {
            draft.isFetching = true
            draft.error = null
            draft.carts = [...draft.carts, data]
            func.addToCart(data)
            func.notificationAlert("success", "Notification", "Cart added successfully! \n Please go to cart to view details ")
        }),
    [Types.LOAD_CART]: (state, { arrData }) =>
        produce(state, draft => {
            draft.isFetching = true
            draft.error = null
            draft.carts = arrData
        }),

    [Types.REMOVE_FROM_CART]: (
        state,
        { id }
    ) =>
        produce(state, draft => {
            draft.isFetching = false
            draft.carts = draft.carts.filter(item => item.id !== id)
            func.removeItemFromCart(id)
        }),

    [Types.REMOVE_ALL_CART]: (state) =>
        produce(state, draft => {
            draft.isFetching = false
            draft.carts = []
            func.removeAllCart()
        })
})
