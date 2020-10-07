import Swal from 'sweetalert2';
import { db } from '../firebase/firebase-config';
import { Constants } from '../services/constants';
import { fileUpload } from '../services/fileUpload';
import { loadNotes } from '../services/loadNotes';


export const startNewNote = () => {
    return async ( dispatch, getState ) => {

        const uid = getState().auth.uid;

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        };

        const doc = await db.collection(`${uid}/journal/notes`).add( newNote );

        dispatch( activeNote( doc.id, newNote ) );
        dispatch( addNewNote( doc.id, newNote ) );
    }
}

export const activeNote = ( id, note ) => ({

    type: Constants.notesActive,
    payload: {
        id,
        ...note
    }
})

export const addNewNote = ( id, note ) => ({
    type: Constants.notesAddNew,
    payload: {
        id, ...note 
    }
})

export const startLoadingNotes = ( uid ) => {
    return async ( dispatch ) => {

        const notes = await loadNotes( uid );
        dispatch( setNotes( notes) );
    }
}

export const setNotes = ( notes ) => ({

    type: Constants.notesLoad,
    payload: notes
})

export const startSaveNote = ( note ) => {
    return async ( dispatch, getState ) => {

        const uid = getState().auth.uid;

        if ( !note.url ) {
            
            delete note.url;
        }

        const noteToFireStore = { ...note };

        delete noteToFireStore.id;

        await db.doc( `${ uid }/journal/notes/${ note.id }` ).update( noteToFireStore );

        dispatch( refreshNotes( note.id, noteToFireStore ) );

        Swal.fire( 'Saved', note.title, 'success');
    }
}

export const refreshNotes = ( id, note ) => ({
    type: Constants.notesUpdated,
    payload: {
        id,
        note: {
            id,
            ...note
        }
    }
})

export const startUploading = ( file ) => {
    return async ( dispatch, getState ) => {

        const { active: activeNote } = getState().notes;

        Swal.fire({
            title: 'Uploading.......',
            text: 'Please wait........',
            allowOutsideClick: false,
            onBeforeOpen: () => {
                Swal.showLoading();
            }
        });

        const fileURL = await fileUpload( file );
        activeNote.url = fileURL;

        dispatch( startSaveNote( activeNote ) );

        Swal.close();
    }
}

export const startDeletingNote = ( id ) => {
    return async ( dispatch, getState ) => {

        const uid = getState().auth.uid;
        await db.doc(`${ uid }/journal/notes/${ id }`).delete();
        dispatch( deleteNote( id ) );
    }
}

export const deleteNote = ( id ) => ({
    type: Constants.notesDelete,
    payload: id 
})

export const noteLogoutClean = () => ({
    type: Constants.notesLogOutCleaning
})