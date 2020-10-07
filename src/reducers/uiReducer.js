import { Constants } from "../services/constants";

const initialState = {
    loading: false,
    msgError: null
}

export const uiReducer = ( state = initialState, action ) => {

    switch ( action.type ) {
        case Constants.uiSetError:
            return {
                ...state,
                msgError: action.payload
            }

        case Constants.uiRemoveError:
            return {
                ...state,
                msgError: null
            }

        case Constants.uiStartLoading:
            return {
                ...state,
                loading: true
            }

        case Constants.uiFinishLoading:
            return {
                ...state,
                loading: false
            }
    
        default:
            return state;
    }
}