import React, { useEffect, useState } from 'react'
import styles from '../../styles/User.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser, setErrorMessageReducer } from '../../features/user/userSlice'
import Spinner from '../Spinner/Spinner'

const UserLoginForm = ({ onCloseModal, onChangeForm, isLoading, errorMessage }) => {

    const dispatch = useDispatch()

    const [values, setValues] = useState({
        email: "",
        password: "",
    })

    const { currentUser } = useSelector(({ user }) => user)

    useEffect(() => {
        if (errorMessage) {
            dispatch(setErrorMessageReducer(null))
        }
    }, [dispatch])

    useEffect(() => {
        if (!errorMessage && currentUser) {
            onCloseModal()
        }
    }, [currentUser])


    const handleSubmit = (event) => {
        event.preventDefault()
        dispatch(loginUser(values))
    }

    const handleChange = ({ target: { value, name } }) => {
        setValues({ ...values, [name]: value })
    }

    
    const refactorErrorMessage = errorMessage === 'Unauthorized' ? 'Email or password does not correct!' : errorMessage





    return (
        <div className={styles.wrapper}>
            <div className={styles.close} onClick={onCloseModal}>
                <svg className="icon">
                    <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#close`} />
                </svg>
            </div>
            <div className={styles.title}>Login</div>

            <form className={styles.form} onSubmit={handleSubmit}>
                {isLoading && <Spinner />}
                {errorMessage && <p className={styles.error}>{refactorErrorMessage}</p>}

                <div className={styles.group}>
                    <input type="email" name="email" placeholder='Your email...' value={values.email} onChange={handleChange} />
                </div>

                <div className={styles.group}>
                    <input type="password" name="password" placeholder='Your password...' value={values.password} autoComplete='off' onChange={handleChange} />
                </div>

                <div className={styles.link} onClick={onChangeForm}>
                    Create an account
                </div>
                <button type="submit" className={styles.submit}>Login</button>
            </form>

        </div >
    )
}

export default UserLoginForm