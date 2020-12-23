import '@testing-library/jest-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk'
import { Login, logOut, startLoginEmailPassword, startLogOut, startRegisterWithEmailPasswordName } from '../../actions/auth';
import { Constants } from '../../services/constants';


const middlewares = [ thunk ];
const mockStore = configureStore( middlewares );

const initialState = {
    auth: {
        uid: 'TESTING'
    },
    notes: {
        active: {
            id: 'dXLsXKRnQcinBFAqv8x7',
            title: 'Hola',
            body: 'Mundo'
        }
    }
};

let store = mockStore( initialState );

describe('Pruebas en Auth-actions', () => {

    beforeEach( () => {

        store = mockStore( initialState );
    });
    
    test('Debe de crear la accion de LogIn y LogOut', () => {

        const uid = 'ABCD123';
        const displayName = 'Aldo Ivan';
        
        const LoginAction = Login( uid, displayName );
        const LogOutAction = logOut();

        expect( LoginAction ).toEqual({
            type: Constants.login,
            payload: {
                uid,
                displayName
            }
        })

        expect( LogOutAction ).toEqual({
            type: Constants.logout
        })
    });

    test('Debe de realizar el startLogOut', async () => {

        await store.dispatch( startLogOut() );

        const actions = store.getActions();

        expect( actions[0] ).toEqual({ type: Constants.logout });
        expect( actions[1] ).toEqual({ type: Constants.notesLogOutCleaning });
    });
    
    test('Debe de realizar el startLoginEmailPassword ', async () => {
        
        await store.dispatch( startLoginEmailPassword( 'test@testing.com', '123456' ) );

        const actions = store.getActions();

        expect( actions[1] ).toEqual({
            type: Constants.login,
            payload: {
                uid: expect.any( String ),
                displayName: null
            }
        })
    });

    test('Debe de mostrar el error al tratar de hacer el startRegisterWithEmailPasswordName con un usuario registrado', async () => {
        
        await store.dispatch( startRegisterWithEmailPasswordName( 'test1@testing.com', '123456', 'TEST' ) );

        const actions = store.getActions();

        expect( actions ).toEqual([]);
    })
    
    
})
