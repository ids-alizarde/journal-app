/*
    {
        notes: [],
        active: null,
        active: {
            id: 'asdadasdasda',
            title: '',
            body: '',
            imageUrl: '',
            date: 112312312312
        }
    }
*/

import { Constants } from '../services/constants';

const initialState = {
    notes: [],
    active: null
}

export const notesReducer = ( state = initialState, action ) => {
    
    switch ( action.type ) {

        case Constants.notesActive:
            return {
                ...state,
                active: {
                    ...action.payload
                }
            }
        
        case Constants.notesAddNew:
            return {
                ...state,
                notes: [ action.payload, ...state.notes ]
            }

        case Constants.notesLoad:
            return {
                ...state,
                notes: [ ...action.payload ]
            }

        case Constants.notesUpdated:
            return {
                ...state,
                notes: state.notes.map(
                    note => note.id === action.payload.id
                        ? action.payload.note
                        : note
                )
            }

        case Constants.notesDelete:
            return {
                ...state,
                active: null,
                notes: state.notes.filter( note => note.id !== action.payload )
            }

        case Constants.notesLogOutCleaning:
            return {
                ...state,
                notes: [],
                active: null
            }

        default:
            return state;
    }
}