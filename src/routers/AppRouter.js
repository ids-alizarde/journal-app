import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import { AuthRouter } from './AuthRouter';
import { JournalScreen } from '../components/journal/JournalScreen';
import { firebase } from '../firebase/firebase-config';
import { useDispatch } from 'react-redux';
import { Login } from '../actions/auth';
import { PublicRoutes } from './PublicRoutes';
import { PrivateRoutes } from './PrivateRoutes';
import { startLoadingNotes } from '../actions/notes';

export const AppRouter = () => {

    const dispatch = useDispatch();
    const [ checking, setChecking ] = useState( true );
    const [ isLoggedIn, setIsLoggedIn ] = useState( false );

    useEffect(() => {
        
        firebase.auth().onAuthStateChanged( ( user ) => {
            if ( user?.uid ) {

                dispatch( Login( user.uid, user.displayName ) );
                setIsLoggedIn( true );
                dispatch( startLoadingNotes( user.uid ) );
                
            } else {
                setIsLoggedIn( false );
            }

            setChecking( false );
        });
    }, [ dispatch, setChecking, setIsLoggedIn ])

    if ( checking ) {
        return (
            <>
                <div className="loader"></div>
            </>
        )
    }

    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoutes path="/auth" component={ AuthRouter } isLoggedIn={ isLoggedIn } />
                    <PrivateRoutes exact path="/" component={ JournalScreen } isLoggedIn={ isLoggedIn }/>

                    <Redirect to="/auth/login" />
                </Switch>
            </div>
        </Router>
    )
}
