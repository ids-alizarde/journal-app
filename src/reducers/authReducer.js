import { Constants } from '../services/constants';

/*

    {
        uid: 'aaf8afa8f798ehbj',
        name: Aldo
    }

 */

export const authReducer = ( state = {}, action ) => {
   
    switch ( action.type ) {
        case Constants.login:
            return {
                uid: action.payload.uid,
                name: action.payload.displayName
            }
        
        case Constants.logout:
            return {}
    
        default:
            return state;
    }
}
