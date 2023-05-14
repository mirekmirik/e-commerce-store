import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleForm, toggleFormType } from '../../features/user/userSlice'
import UserSignUpForm from './UserSignUpForm'
import styles from '../../styles/User.module.css'
import UserLoginForm from './UserLoginForm'


function UserForm() {
    const dispatch = useDispatch()
    const { showForm, formType, isLoading, errorMessage } = useSelector(({ user }) => user)


    const closeModalHandler = () => {
        dispatch(toggleForm(false))
    }

    const changeFormHandler = () => {
        dispatch(toggleFormType())
    }





    return showForm && (
        <>
            <div className={styles.overlay} onClick={closeModalHandler} />
            {formType === 'signup' ? (
                <UserSignUpForm onCloseModal={closeModalHandler} onChangeForm={changeFormHandler} isLoading={isLoading} errorMessage={errorMessage} />
            ) : (
                <UserLoginForm onCloseModal={closeModalHandler} onChangeForm={changeFormHandler} isLoading={isLoading} errorMessage={errorMessage} />
            )}
        </>
    );

}

export default UserForm