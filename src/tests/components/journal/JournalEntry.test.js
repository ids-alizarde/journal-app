import '@testing-library/jest-dom';
import React from 'react';
import { mount } from 'enzyme'
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk'
import { Constants } from '../../../services/constants';
import { JournalEntry } from '../../../components/journal/JournalEntry';
import { activeNote } from '../../../actions/notes';


const middlewares = [ thunk ];
const mockStore = configureStore( middlewares );

const initialState = {};

let store = mockStore( initialState );
store.dispatch = jest.fn();

const note = {
    id: 10,
    title: 'Hola',
    body: 'Mundo',
    date: 0,
    url: 'https://algo.com/image.jpg'
};

const wrapper = mount( 
    <Provider store={ store }>
        <JournalEntry { ...note }/> 
    </Provider>
);


describe('Pruebas en <JournalEntry/>', () => {
    
    test('Debe de mostrar correctamente el componente <JournalEntry/>', () => {

       expect( wrapper ).toMatchSnapshot(); 
    });
    
    test('Debe de activar la nota', () => {

       wrapper.find( '.journal__entry' ).prop( 'onClick' )();

       expect( store.dispatch ).toHaveBeenCalled(); 
       expect( store.dispatch ).toHaveBeenCalledTimes(1); 
       expect( store.dispatch ).toHaveBeenCalledWith(
           activeNote( note.id, { ...note } )
       ); 
    });
    
})
