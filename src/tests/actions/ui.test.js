import '@testing-library/jest-dom';
import { finishLoading, removeError, setError, startLoading } from '../../actions/ui';
import { Constants } from '../../services/constants';

describe('Pruebas en ui-actions', () => {
    
    test('Todas las acciones deben de funcionar', () => {
        
        const action = setError( 'Error en la accion' );

        expect( action ).toEqual({
            type: Constants.uiSetError,
            payload: 'Error en la accion'
        });

        const actionRemoveError = removeError();
        const actionStartLoading = startLoading();
        const actionFinishLoading = finishLoading();

        expect( actionRemoveError ).toEqual({
            type: Constants.uiRemoveError
        });

        expect( actionStartLoading ).toEqual({
            type: Constants.uiStartLoading
        });

        expect( actionFinishLoading ).toEqual({
            type: Constants.uiFinishLoading
        });         
        
    })
    
})
