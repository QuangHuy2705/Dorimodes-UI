import { createReducer } from "reduxsauce";

import { Types } from "../actionCreators";

export const INITIAL_STATE = {
    parseTranslatesLoaded: false,
    translationLoaded: false,
    translation: {},
    error: false,
    errorMessage: ""
};

// ------

export const translationRequest = (state = INITIAL_STATE, action) => ({
    ...state,
    parseTranslatesLoaded: false,
    translationLoaded: false
});

export const translationSuccess = (state = INITIAL_STATE, action) => ({
    ...state,
    parseTranslatesLoaded: true,
    translationLoaded: true,
    translation: action.translation,
    error: false
});

export const translationFailure = (state = INITIAL_STATE, action) => ({
    ...state,
    parseTranslatesLoaded: false,
    translationLoaded: false,
    translation: {},
    error: true,
    errorMessage: action.error
});

// ------

export const HANDLERS = {
    [Types.TRANSLATION_REQUEST]: translationRequest,
    [Types.TRANSLATION_SUCCESS]: translationSuccess,
    [Types.TRANSLATION_FAILURE]: translationFailure
};

export default createReducer(INITIAL_STATE, HANDLERS);
