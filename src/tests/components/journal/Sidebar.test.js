import '@testing-library/jest-dom';
import React from 'react';
import { mount } from 'enzyme'
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk'
import { Constants } from '../../../services/constants';
import { act } from '@testing-library/react';
import { startLogOut } from '../../../actions/auth';
import { startNewNote } from '../../../actions/notes';
import { Sidebar } from '../../../components/journal/Sidebar';

jest.mock('../../../actions/auth', () => ({

    startLogOut: jest.fn()
}));

jest.mock('../../../actions/notes', () => ({

    startNewNote: jest.fn()
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
        active: null,
        notes: []
    }
};

let store = mockStore( initialState );
store.dispatch = jest.fn();

const wrapper = mount( 
        <Provider store={ store }>
            <Sidebar/> 
        </Provider>
    );


describe('Pruebas en <Sidebar/>', () => {
    
    test('Debe de mostrarse correctamente el <Sidebar/>', () => {
        
        expect( wrapper ).toMatchSnapshot();
    });

    test('Debe de llamar el startLogOut ', () => {
        
        wrapper.find( '.btn' ).prop( 'onClick' )();

        expect( startLogOut ).toHaveBeenCalled();
        expect( startLogOut ).toHaveBeenCalledTimes(1);
    });
    
    test('Debe de llamar el startNewNote', () => {
        
        wrapper.find( '.journal__new-entry' ).simulate( 'click' );

        expect( startNewNote ).toHaveBeenCalled();
        expect( startNewNote ).toHaveBeenCalledTimes(1);
    });
    
})
