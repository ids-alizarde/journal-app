import '@testing-library/jest-dom';
import { act } from '@testing-library/react';
import React from 'react';
import { mount } from 'enzyme'
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk'
import { MemoryRouter } from 'react-router-dom';
import { Login } from '../../actions/auth';
import { AppRouter } from '../../routers/AppRouter';
import { firebase } from '../../firebase/firebase-config';

jest.mock('../../actions/auth', () => ({

    Login: jest.fn()
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
    notes: {
        active: {
            id: 'FSDFSDFSDF'
        },
        notes: []
    }
};

let store = mockStore( initialState );
store.dispatch = jest.fn();


describe('Pruebas en <AppRouter/>', () => {
    
    test('Debe de llamar el Login si estoy autenticado', async () => {

        let user;
        
        await act( async () => {

            const userCred = await firebase.auth().signInWithEmailAndPassword( 'test@testing.com', '123456' );
            user = userCred.user;

            const wrapper = mount( 
                <Provider store={ store }>
                    <MemoryRouter>
                        <AppRouter/> 
                    </MemoryRouter>
                </Provider>
            );
        });

        expect( Login ).toHaveBeenCalled();
        expect( Login ).toHaveBeenCalledWith( 'R910fycpnxUoX1b5Vc7xHbrMnPw2', null );
    })
    
})
