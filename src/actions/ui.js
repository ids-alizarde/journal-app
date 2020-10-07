import { Constants } from "../services/constants";

export const setError = ( err ) => ({
    type: Constants.uiSetError,
    payload: err
});

export const removeError = ( err ) => ({
    type: Constants.uiRemoveError
});

export const startLoading = () => ({
    type: Constants.uiStartLoading
});

export const finishLoading = () => ({
    type: Constants.uiFinishLoading
});