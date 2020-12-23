import '@testing-library/jest-dom';
import { Constants } from '../../services/constants';


describe('Pruebas con nuestras constantes', () => {
    
    test('Los objetos deben de ser iguales', () => {

        expect( Constants ).toEqual({
            login: '[Auth] Login',
            logout: '[Auth] Logout',

            uiSetError: '[UI] Set Error',
            uiRemoveError: '[UI] Remove Error',
            uiStartLoading: '[UI] Start loading',
            uiFinishLoading: '[UI] Finish loading',

            notesAddNew: '[Notes] New note',
            notesActive: '[Notes] Set active note',
            notesLoad: '[Notes] Load note',
            notesUpdated: '[Notes] Updated note',
            notesFileUrl: '[Notes] Update image URL',
            notesDelete: '[Notes] Delete note',
            notesLogOutCleaning: '[Notes] LogOut Cleaning',

            fireBaseTestEnvironment: 'test',
        });
    })
    
})
