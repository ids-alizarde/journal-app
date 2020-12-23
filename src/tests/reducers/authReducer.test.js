import '@testing-library/jest-dom';
import { authReducer } from '../../reducers/authReducer';
import { Constants } from '../../services/constants';

describe('Pruebas en el authReducer.js', () => {

    const initialState = {};
    const initialStateLogIn = {
            uid: 'Xjdha78asdj83jado',
            name: 'Aldo Ivan'
        };
    
    test('Debe de regresar el estado por default', () => {

        const action = {
            type: 'default',
            payload: {
                uid: 'Xj',
                displayName: 'Aldo' 
            }
        }
        
        const state = authReducer( initialStateLogIn, action );

        expect( state ).toEqual( initialStateLogIn );
    });

    test('Debe de hacer el LogIn', () => {
        
        const action = {
            type: Constants.login,
            payload: {
                uid: 'Xjdha78asdj83jado',
                displayName: 'Aldo Ivan' 
            }
        }

        const state = authReducer( initialState, action );

        expect( state ).toEqual({
            uid: 'Xjdha78asdj83jado',
            name: 'Aldo Ivan'
        })
        expect( state.uid ).toBe( 'Xjdha78asdj83jado' );
    });

    test('Debe de hacer el LogOut', () => {
        
        const action = {
            type: Constants.logout,
        }

        const state = authReducer( initialStateLogIn, action );

        expect( state ).toEqual( {} );
    });
    
})
