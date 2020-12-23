import Swal from 'sweetalert2';
import { firebase, googleAuthProvider } from '../firebase/firebase-config';
import { Constants } from '../services/constants';
import { noteLogoutClean } from './notes';
import { startLoading, finishLoading } from './ui';

export const startLoginEmailPassword = ( email, password ) => {
    return ( dispatch ) => {

        dispatch( startLoading() );

        return firebase.auth().signInWithEmailAndPassword( email, password )
            .then( ({ user }) => {

                dispatch(Login( user.uid, user.displayName ));
                dispatch( finishLoading() );
            })
            .catch( e => {
                console.log(e);
                dispatch( finishLoading() );
                Swal.fire( 'Error', e.message, 'error' );
            });
    }
}

export const startRegisterWithEmailPasswordName = ( email, password, name ) => {
    return ( dispatch ) => {
        
        return firebase.auth().createUserWithEmailAndPassword( email, password )
            .then( async({ user }) => {
                await user.updateProfile({ displayName: name });
                dispatch(Login( user.uid, user.displayName ));
            })
            .catch( e => {
                // console.log(e);
                Swal.fire( 'Error', e.message, 'error' );
            });
            
    }
}

export const startGoogleLogin = () => {
    return ( dispatch ) => {
        firebase.auth().signInWithPopup( googleAuthProvider )
            .then( ({ user }) => {
                dispatch(Login( user.uid, user.displayName ));
            });
    }
}

export const Login = ( uid, displayName ) => ({
    type: Constants.login,
    payload: {
        uid,
        displayName
    }
});

export const startLogOut = () => {
    return async( dispatch ) => {

        await firebase.auth().signOut();
        dispatch( logOut() );
        dispatch( noteLogoutClean() ); 
    }
}

export const logOut = () => ({
    type: Constants.logout
});