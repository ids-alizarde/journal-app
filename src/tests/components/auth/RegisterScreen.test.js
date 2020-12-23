import '@testing-library/jest-dom';
import React from 'react';
import { mount } from 'enzyme'
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk'
import { MemoryRouter } from 'react-router-dom';
import { RegisterScreen } from '../../../components/auth/RegisterScreen';
import { Constants } from '../../../services/constants';
import { act } from '@testing-library/react';

// jest.mock('../../../actions/auth', () => ({
//     startGoogleLogin: jest.fn(),
//     startLoginEmailPassword: jest.fn()
// }));

const middlewares = [ thunk ];
const mockStore = configureStore( middlewares );

const initialState = {
    UI: {
        loading: false,
        msgError: null
    },
    notes: {
        active: null
    }
};

let store = mockStore( initialState );
// store.dispatch = jest.fn();

let wrapper = mount( 
    <Provider store={ store }>
        <MemoryRouter>
            <RegisterScreen/> 
        </MemoryRouter>
    </Provider>
);


describe('Pruebas en <RegisterScreen/>', () => {

    test('Debe de renderizar el componente <RegisterScreen/>', () => {
        
        expect( wrapper ).toMatchSnapshot();
    });
    
    test('Debe de hacer el dispatch de la accion respectiva', () => {
        
        const textField = wrapper.find( 'input[name="email"]');
        textField.simulate( 'change', {
            target: {
                value: '',
                name: 'email'
            }
        });

        wrapper.find( 'form' ).simulate( 'submit', {
            preventDefault(){}
        });

        const actions = store.getActions();

        expect( actions[0] ).toEqual({
            type: Constants.uiSetError,
            payload: expect.any( String )
        })
    });
    
    test('Debe de hacer el dispatch de la accion respectiva campo name', () => {
        
        const textField = wrapper.find( 'input[name="name"]');

        act(() => {

            // textField.prop( 'onChange' )(( {
            //     target: {
            //         value: '',
            //         name: 'name'
            //     }
            // }));

            textField.props().onChange({
                target: {
                    value: '',
                    name: 'name'
                }
            });
        });

        // textField.simulate( 'change', {
        //     target: {
        //         value: '',
        //         name: 'name'
        //     }
        // });

        wrapper.find( 'form' ).simulate( 'submit', {
            preventDefault(){}
        });

        const actions = store.getActions();

        expect( actions[1] ).toEqual({
            type: Constants.uiSetError,
            payload: expect.any( String )
        })
    });

    test('Debe de mostrar la caja de alerta con el Error', () => {
        
        const initialState = {
            UI: {
                loading: false,
                msgError: 'Email no es correcto'
            },
            notes: {
                active: null
            }
        };

        const store = mockStore( initialState );

        const wrapper = mount( 
            <Provider store={ store }>
                <MemoryRouter>
                    <RegisterScreen/> 
                </MemoryRouter>
            </Provider>
        );

        expect( wrapper.find( '.auth__alert-error' ).exists() ).toBe( true );
        expect( wrapper.find( '.auth__alert-error' ).text() ).toBe( 'Email no es correcto' );
    })
    
})
