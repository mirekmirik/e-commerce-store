import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from '../../features/user/userSlice'
import { useLocation, useNavigate } from 'react-router'
import styles from '../../styles/Profile.module.css'
import Spinner from '../Spinner/Spinner'
import { Link } from 'react-router-dom'
import { ROUTES } from '../../utils/routes'

const Profile = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { pathname } = useLocation()
    const { currentUser, isLoading, errorMessage } = useSelector(({ user }) => user)

    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        oldPassword: "",
        avatar: ""
    })
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)


    useEffect(() => {
        if (pathname === '/profile' && !currentUser) {
            navigate('/')
            return;
        }
        setValues({ ...currentUser, password: "", oldPassword: "" })
    }, [pathname, currentUser, navigate])


    const sendUpdateUser = async (valuesToUpdate) => {
        try {

            delete valuesToUpdate.oldPassword
            const resultAction = await dispatch(updateUser(valuesToUpdate))
            if (updateUser.fulfilled.match(resultAction)) {
                console.log(updateUser.fulfilled.match(resultAction))
                setSuccess('User updated!')
            } else {
                setError(errorMessage)
            }
        } catch(err) {
            console.log(err)
        }
    }


    const updateUserHandler = (event) => {
        event.preventDefault()

        error && setError(null)
        success && setSuccess(null)

        const isSamePassword = values.oldPassword.length > 2 && values.oldPassword == currentUser.password
        const isNotTypingPassword = !values.oldPassword && !values.password

        if (isNotTypingPassword) {
            sendUpdateUser({ ...values, password: currentUser.password })
            return;
        }

        if (!isSamePassword) {
            setError('Your password is not correct...')
            return;
        }
        sendUpdateUser(values)
    }


    const handleChange = ({ target: { value, name } }) => {
        setValues((prevState) => ({ ...prevState, [name]: value }));
    }


    return (
        <section className={styles.profile}>
            {!currentUser ? <span>You need to log in</span> : (

                <form className={styles.form} onSubmit={updateUserHandler} >
                    <Link to={ROUTES.CREATE_PRODUCT}>
                        <button type='button' className={styles.button}>Create Product</button>
                    </Link>

                    {isLoading && <Spinner />}
                    {/* {errorMessage && !isLoading && <span className={styles.error}>{errorMessage}</span>} */}
                    {error && !isLoading && <span className={styles.error}>{error}</span>}
                    {success && !isLoading && <span className={styles.success}>{success}</span>}
                    Write your new Email
                    <div className={styles.group}>
                        <input type="email" name="email" value={values.email} placeholder='Your new email...' autoComplete='off' onChange={handleChange} />
                    </div>
                    Write your new Name

                    <div className={styles.group}>
                        <input type="name" name="name" value={values.name} placeholder='Your new name...' autoComplete='off' onChange={handleChange} />
                    </div>
                    Repeat your password
                    <div className={styles.group}>
                        <input type="password" name="oldPassword" value={values.oldPassword} placeholder='Type your current password...' autoComplete='off' onChange={handleChange} />
                    </div>
                    Write your new Password

                    <div className={styles.group}>
                        <input type="password" name="password" placeholder='Your new password...' value={values.password} autoComplete='off' onChange={handleChange} />
                    </div>
                    Write your new Avatar

                    <div className={styles.group}>
                        <input type="avatar" name="avatar" placeholder='Your new avatar...' value={values.avatar} autoComplete='off' onChange={handleChange} />
                    </div>

                    <button type="submit" className={styles.submit}>Update user</button>
                </form>
            )}
        </section>
    )
}

export default Profile

        // if (!values.email && !values.id) {
        //     setValues({
        //         email: currentUser?.email,
        //         id: currentUser?.id
        //     })
        // }

    // useEffect(() => {
    //     if (pathname === '/profile') {
    //         navigate('/')
    //     }
    // }, [currentUser, pathname])