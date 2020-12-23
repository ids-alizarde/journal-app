import '@testing-library/jest-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk'
import { startLoadingNotes, startNewNote, startSaveNote, startUploading } from '../../actions/notes';
import { db } from '../../firebase/firebase-config';
import { Constants } from '../../services/constants';

jest.mock( '../../services/fileUpload', () => ({
    fileUpload: jest.fn( () => {
        // return 'https://hola-mundo/cos.jpg';
        return Promise.resolve( 'https://hola-mundo/cos.jpg' );
    })
}));
 
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

const note = {
    id: expect.any( String ),
    title: '',
    body: '',
    date: expect.any( Number )
}

describe('Pruebas en notes-actions', () => {

    beforeEach( () => {

        store = mockStore( initialState );
    });
    
    test('Debe de crear una nueva nota startNewNote', async () => {
        
        await store.dispatch( startNewNote() );

        const actions = store.getActions();
        const docID = actions[0].payload.id;

        expect( actions[0] ).toEqual({
            type: Constants.notesActive,
            payload: note
        });

        expect( actions[1] ).toEqual({
            type: Constants.notesAddNew,
            payload: note
        });

        await db.doc(`TESTING/journal/notes/${ docID }`).delete();
    });

    test('startLoadingNotes debe de cargar las notas', async () => {
        
        await store.dispatch( startLoadingNotes( initialState.auth.uid ) );

        const actions = store.getActions();
        const expected = {
            id: expect.any( String ),
            title: expect.any( String ),
            body: expect.any( String ),
            date: expect.any( Number ),
        }

        expect( actions[0].payload.length ).toBeGreaterThanOrEqual( 2 );
        expect( actions[0].payload[0].id ).toBe( 'dXLsXKRnQcinBFAqv8x7' );
        expect( actions[0].type ).toBe( Constants.notesLoad );
        expect( actions[0] ).toEqual({
            type: Constants.notesLoad,
            payload: expect.any( Array )
        });

        expect( actions[0].payload[0] ).toMatchObject( expected );
        
    });
    
    test('startSaveNote debe de actualizar la nota', async () => {

        const note = {
            id: 'dXLsXKRnQcinBFAqv8x7',
            title: 'titulo',
            body: 'body'
        }
        
        await store.dispatch( startSaveNote( note ) );

        const actions = store.getActions();
        const documentReference = await db.doc(`${ initialState.auth.uid }/journal/notes/${ note.id }`).get();

        expect( actions[0].type ).toBe( Constants.notesUpdated );
        expect( actions[0].payload.note ).toEqual( note );
        expect( documentReference.data().title ).toBe( note.title );

    });

    test('startUploading debe de actualizar la url de la nota', async () => {
        
        const file = new File( [], 'foto.jpg' );

        await store.dispatch( startUploading( file ) );

        const documentReference = await db.doc(`${ initialState.auth.uid }/journal/notes/${ initialState.notes.active.id }`).get();

        expect( documentReference.data().url ).toBe( 'https://hola-mundo/cos.jpg' );
        expect( typeof documentReference.data().url ).toBe( 'string' );

    })
    
    
})
