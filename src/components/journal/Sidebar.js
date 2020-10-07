import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { JournalEntries } from './JournalEntries';
import { startLogOut } from '../../actions/auth';
import { startNewNote } from '../../actions/notes';

export const Sidebar = () => {

    const dispatch = useDispatch();
    const { name } = useSelector( state => state.auth )

    const handleLogOut = () => {

        dispatch( startLogOut() );
    }

    const handleAddNew = () => {

        dispatch( startNewNote() );
    }

    return (
        <aside className="journal__sidebar">
            <div className="journal__sidebar-navbar">
                <h3 className="mt-5">
                    <i className="far fa-moon" aria-hidden="true"></i>
                    <span> { name }</span>
                </h3>

                <button className="btn"
                        onClick={ handleLogOut } >
                    Logout
                </button>
            </div>

            <div className="journal__new-entry"
                onClick={ handleAddNew }>
                <i className="far fa-calendar-plus fa-5x"></i>
                <p className="mt-5">New Entry</p>
            </div>

            <JournalEntries />
        </aside>
    )
}