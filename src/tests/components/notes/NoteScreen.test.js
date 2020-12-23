import '@testing-library/jest-dom';
import React from 'react';
import { mount } from 'enzyme'
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk'
import { Constants } from '../../../services/constants';
import { NoteScreen } from '../../../components/notes/NoteScreen';
import { activeNote } from '../../../actions/notes';

jest.mock('../../../actions/notes', () => ({

    activeNote: jest.fn()
}));

const middlewares = [ thunk ];
const mockStore = configureStore( middlewares );

const initialState = {
    auth: {
        uid: 'TESTING',
        name: 'Aldo Ivan'
    },
    UI: {
        loading: false,
        msgError: null
    },
    notes: {
        active: {
            id: 1234,
            title: 'Titulo de la nota',
            body: 'Body de la nota',
            date: 0
        },
        notes: []
    }
};

let store = mockStore( initialState );
store.dispatch = jest.fn();

const wrapper = mount( 
    <Provider store={ store }>
        <NoteScreen/> 
    </Provider>
);

describe('Pruebas en <NoteScreen/>', () => {

    const argumentChangeNote = {
        body: 'Body de la nota',
        title: 'Hola de nuevo',
        id: 1234,
        date: 0

    }
    
    test('Debe de mostrarse correctamente el componente <NoteScreen/>', () => {
        
        expect( wrapper ).toMatchSnapshot();
    });

    test('Debe de disparar el activeNote', () => {

        wrapper.find( 'input[name="title"]' ).simulate( 'change', {
            target: {
                name: 'title',
                value: 'Hola de nuevo'
            }
        });

        expect( activeNote ).toHaveBeenLastCalledWith( 1234, argumentChangeNote );
    });
    
    
})
