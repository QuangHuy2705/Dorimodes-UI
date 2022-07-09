/* eslint-disable no-param-reassign */
import { createActions, createReducer } from 'reduxsauce'
import produce from 'immer'

/* ------------- Types and Action Creators ------------- */
const { Types, Creators: Actions } = createActions(
    {
        postOrderRequest: ['data'],
        postOrderSuccess: ['orderId'],
        postOrderFailure: ['error'],
    },
    { prefix: '@CATEGORY/' }
)

export { Types, Actions }

const INITIAL_STATE = {
    isFetching: false,
    orderId: null,
    error: null
}

export default createReducer(INITIAL_STATE, {
    [Types.POST_ORDER_REQUEST]: (state) =>
        produce(state, draft => {
            draft.isFetching = true
            draft.orderId = null
            draft.error = null
        }),

    [Types.POST_ORDER_SUCCESS]: (
        state,
        { orderId }
    ) =>
        produce(state, draft => {
            draft.isFetching = false
            draft.orderId = orderId
        }),

    [Types.POST_ORDER_FAILURE]: (state, { error }) =>
        produce(state, draft => {
            draft.isFetching = false
            draft.error = error
        })
})
