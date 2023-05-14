import React, { useEffect, useState } from 'react'
import styles from '../../styles/User.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { createUser, setErrorMessageReducer } from '../../features/user/userSlice'
import Spinner from '../Spinner/Spinner'

const UserSignUpForm = ({ onCloseModal, onChangeForm, isLoading, errorMessage }) => {



    const dispatch = useDispatch()

    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        avatar: ""
    })

    const { currentUser } = useSelector(({ user }) => user)



    const handleSubmit = (event) => {
        event.preventDefault()
        const isAvatar = values.avatar ? values.avatar : 'https://images.theconversation.com/files/500899/original/file-20221214-461-22jr1l.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=1200.0&fit=crop'
        dispatch(createUser({...values, avatar: isAvatar}))
    }

    useEffect(() => {
        if (errorMessage) {
            dispatch(setErrorMessageReducer(null))
        }
    }, [])


    useEffect(() => {
        if (!errorMessage && currentUser) {
            onCloseModal()
        }
    }, [errorMessage, currentUser])



    const handleChange = ({ target: { value, name } }) => {
        setValues({ ...values, [name]: value })
    }









    return (
        <div className={styles.wrapper}>
            <div className={styles.close} onClick={onCloseModal}>
                <svg className="icon">
                    <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#close`} />
                </svg>
            </div>
            <div className={styles.title}>Sign Up</div>

            <form className={styles.form} onSubmit={handleSubmit}>
                {isLoading && <Spinner />}
                {errorMessage && <p className={styles.error}>{errorMessage}</p>}

                <div className={styles.group}>
                    <input type="email" name="email" placeholder='Your email...' value={values.email} autoComplete='off' onChange={handleChange} />
                </div>
                <div className={styles.group}>
                    <input type="name" name="name" placeholder='Your name...' value={values.name} autoComplete='off' onChange={handleChange} />
                </div>
                <div className={styles.group}>
                    <input type="password" name="password" placeholder='Your password...' value={values.password} autoComplete='off' onChange={handleChange} />
                </div>
                <div className={styles.group}>
                    <input type="avatar" name="avatar" placeholder='Your avatar... (optional)' value={values.avatar} autoComplete='off' onChange={handleChange} />
                </div>

                <div className={styles.link} onClick={onChangeForm}>
                    I already have an account
                </div>
                <button type="submit" className={styles.submit}>Create an account</button>
            </form>

        </div >
    )
}

export default UserSignUpForm