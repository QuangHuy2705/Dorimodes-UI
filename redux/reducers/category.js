/* eslint-disable no-param-reassign */
import { createActions, createReducer } from 'reduxsauce'
import produce from 'immer'

/* ------------- Types and Action Creators ------------- */
const { Types, Creators: Actions } = createActions(
    {
        getCategoryRequest: [],
        getCategorySuccess: ['data'],
        getCategoryFailure: ['error'],

        getSizeRequest: [],
        getSizeSuccess: ['data'],
        getSizeFailure: ['error'],
    },
    { prefix: '@CATEGORY/' }
)

export { Types, Actions }

const INITIAL_STATE = {
    isFetching: false,
    isRefreshing: false,
    categories: [],
    sizes: []
}

export default createReducer(INITIAL_STATE, {
    [Types.GET_CATEGORY_REQUEST]: (state) =>
        produce(state, draft => {
            draft.isFetching = true
            draft.error = null
        }),

    [Types.GET_CATEGORY_SUCCESS]: (
        state,
        { data }
    ) =>
        produce(state, draft => {
            draft.isFetching = false
            draft.categories = data
        }),

    [Types.GET_CATEGORY_FAILURE]: (state, { error }) =>
        produce(state, draft => {
            draft.isFetching = false
            draft.error = error
        }),

    [Types.GET_SIZE_REQUEST]: (state) =>
        produce(state, draft => {
            draft.isFetching = true
            draft.error = null
        }),

    [Types.GET_SIZE_SUCCESS]: (
        state,
        { data }
    ) =>
        produce(state, draft => {
            draft.isFetching = false
            draft.sizes = data
        }),

    [Types.GET_SIZE_FAILURE]: (state, { error }) =>
        produce(state, draft => {
            draft.isFetching = false
            draft.error = error
        })
})
