import React from 'react';
import { Link } from 'react-router-dom';
import validator from 'validator';
import { useForm } from '../../hooks/useForm';
import { useDispatch, useSelector } from 'react-redux';
import { setError, removeError } from '../../actions/ui';
import { startRegisterWithEmailPasswordName } from '../../actions/auth';


export const RegisterScreen = () => {

    const dispatch = useDispatch();
    const { msgError } = useSelector( state => state.UI )

    const [ formValues, handleInputChange, reset ] = useForm({
        name: 'Aldo Ivan',
        email: 'aldo@mail.com',
        password: '123456',
        password2: '123456'

    });

    const { name, email, password, password2 } =  formValues;

    const handleRegister = (e) => {
        e.preventDefault();
        
        if ( isFormValid() ) {
            dispatch( startRegisterWithEmailPasswordName( email, password, name) );
        }
    }

    const isFormValid = () => {

        if (name.trim().length === 0 ) {
            
            dispatch( setError( 'Name is required' ) );
            return false;
        } else if ( !validator.isEmail( email ) ) {

            dispatch( setError( 'Email isn´t valid' ) );
            return false;
        } else if ( password !== password2 || password.length < 5 ) {

            dispatch( setError( 'Password should be at least 6 characters and match each other' ) );
            return false;
        }

        dispatch( removeError() );
        return true;
    }

    return (
        <>
            <h3 className="auth__title">Register</h3>
            <form onSubmit={ handleRegister }
                className="animate__animated animate__fadeIn animate__faster" >
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
                        placeholder="Name"
                        name="name" 
                        autoComplete="off"
                        value={ name }
                        onChange={ handleInputChange } />

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
                
                <input type="password"
                        className="auth__input"
                        placeholder="Comfirm Password"
                        name="password2" 
                        autoComplete="off"
                        value={ password2 }
                        onChange={ handleInputChange } />

                <button type="submit"
                        className="btn btn-block btn-primary mb-5">
                    Register
                </button>

                <Link to="/auth/login"
                        className="link mt-5">
                    Already register ?
                </Link>
            </form>
        </>
    )
}
