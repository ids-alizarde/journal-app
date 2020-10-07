import React from 'react';
import { Link } from 'react-router-dom'
import validator from 'validator';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../../hooks/useForm';
import { startLoginEmailPassword, startGoogleLogin } from '../../actions/auth';
import { setError, removeError } from '../../actions/ui';



export const LoginScreen = () => {

    const dispatch = useDispatch();
    const { loading, msgError } = useSelector( state => state.UI )

    const [ formValues, handleInputChange ] = useForm({
        email: 'aldo@mail.com',
        password: '123456'
    });

    const { email, password } = formValues;

    const handleLogin = (e) => {
        e.preventDefault();

        if ( isFormValid() ) {

            dispatch( startLoginEmailPassword( email, password ));
        }
    }

    const handleGoogleLogin = () => {
        dispatch( startGoogleLogin() );
    }

    const isFormValid = () => {

       if ( !validator.isEmail( email ) ) {

            dispatch( setError( 'Email isn´t valid' ) );
            return false;
        } else if ( password.length < 5 ) {

            dispatch( setError( 'Password should be at least 6 characters and match each other' ) );
            return false;
        }

        dispatch( removeError() );
        return true;
    }

    return (
        <>
            <h3 className="auth__title">Login</h3>
            <form onSubmit={ handleLogin } 
                className="animate__animated animate__fadeIn animate__faster">
                { 
                    msgError !== null &&
                    (
                        <div className="auth__alert-error auth__animated auth__fadeInUp">
                            { msgError }
                        </div>
                    )
                }
                <input type="text"
                        className="auth__input"
                        placeholder="Em@il"
                        name="email" 
                        autoComplete="off"
                        value={ email }
                        onChange={ handleInputChange } />

                <input type="password"
                        className="auth__input"
                        placeholder="Password"
                        name="password" 
                        autoComplete="off"
                        value={ password }
                        onChange={ handleInputChange } />

                <button type="submit"
                        className="btn btn-block btn-primary"
                        disabled={ loading } >
                    Login
                </button>

                <div className="auth__social-network">
                    <p>Login with Google</p>
                    <div className="google-btn"
                            onClick={ handleGoogleLogin }>
                        <div className="google-icon-wrapper">
                            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                        </div>
                        <p className="btn-text">
                            <b>Sign in with google</b>
                        </p>
                    </div>
                </div>

                <Link to="/auth/register"
                        className="link">
                    Create a new account
                </Link>
            </form>
        </>
    )
}
