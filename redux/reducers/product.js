/* eslint-disable no-param-reassign */
import { createActions, createReducer } from 'reduxsauce'
import produce from 'immer'

/* ------------- Types and Action Creators ------------- */
const { Types, Creators: Actions } = createActions(
    {
        getProductRequest: [],
        getProductSuccess: ['data'],
        getProductFailure: ['error'],

        getProductFiltersRequest: ['filters'],
        getProductFiltersSuccess: ['data'],
        getProductFiltersFailure: ['error'],

    },
    { prefix: '@PRODUCT/' }
)

export { Types, Actions }

const INITIAL_STATE = {
    isFetching: false,
    isRefreshing: false,
    products: []
}

export default createReducer(INITIAL_STATE, {
    [Types.GET_PRODUCT_REQUEST]: (state) =>
        produce(state, draft => {
            draft.isFetching = true
            draft.error = null
        }),

    [Types.GET_PRODUCT_SUCCESS]: (
        state,
        { data }
    ) =>
        produce(state, draft => {
            draft.isFetching = false
            draft.products = data
        }),

    [Types.GET_PRODUCT_FAILURE]: (state, { error }) =>
        produce(state, draft => {
            draft.isFetching = false
            draft.error = error
        }),
    [Types.GET_PRODUCT_FILTERS_REQUEST]: (state) =>
        produce(state, draft => {
            draft.isFetching = true
            draft.error = null
        }),

    [Types.GET_PRODUCT_FILTERS_SUCCESS]: (
        state,
        { data }
    ) =>
        produce(state, draft => {
            draft.isFetching = false
            draft.products = data
        }),

    [Types.GET_PRODUCT_FILTERS_FAILURE]: (state, { error }) =>
        produce(state, draft => {
            draft.isFetching = false
            draft.error = error
        })
})
