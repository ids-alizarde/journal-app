import '@testing-library/jest-dom';
import React from 'react';
import { mount } from 'enzyme'
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk'
import { LoginScreen } from '../../../components/auth/LoginScreen';
import { MemoryRouter } from 'react-router-dom';
import { startGoogleLogin, startLoginEmailPassword } from '../../../actions/auth';

jest.mock('../../../actions/auth', () => ({
    startGoogleLogin: jest.fn(),
    startLoginEmailPassword: jest.fn()
}));


const middlewares = [ thunk ];
const mockStore = configureStore( middlewares );

const initialState = {
    auth: {
        uid: 'TESTING'
    },
    UI: {
        loading: false,
        msgError: null
    },
};

let store = mockStore( initialState );
store.dispatch = jest.fn();

const wrapper = mount( 
        <Provider store={ store }>
            <MemoryRouter>
                <LoginScreen/> 
            </MemoryRouter>
        </Provider>
    );

describe('Pruebas en <LoginScreen/>', () => {

    beforeEach( () => {

        store = mockStore( initialState );
        jest.clearAllMocks();
    });

    test('Deberia renderizar correctamente', () => {
        
        expect( wrapper ).toMatchSnapshot();
    });
    
    test('Debe de lanzar la accion startGoogleLogin', () => {
        
        // wrapper.find( '.google-btn' ).prop( 'onClick' )();
        wrapper.find( '.google-btn' ).simulate('click');

        expect( startGoogleLogin ).toHaveBeenCalled();
        expect( startGoogleLogin ).toHaveBeenCalledTimes(1);
    });
    
    test('Debe de disparar el startLoginEmailPassword con los respectivos argumentos', () => {

        wrapper.find( 'form' ).prop('onSubmit')({
            preventDefault(){}
        });
        
        expect( startLoginEmailPassword ).toHaveBeenCalled();
        expect( startLoginEmailPassword ).toHaveBeenCalledWith( 'aldo@mail.com', '123456' );
    });
    
})
