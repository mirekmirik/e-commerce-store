import React, { useEffect, useState } from 'react'
import styles from '../../styles/User.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { createUser, setErrorMessageReducer, updateUser } from '../../features/user/userSlice'
import Spinner from '../Spinner/Spinner'
import { useLocation, useNavigate, useParams } from 'react-router'


const UserUpdateForm = () => {

    const { id } = useParams()
    const dispatch = useDispatch()
    const [values, setValues] = useState({ id })

    const updateUserHandler = (event) => {
        event.preventDefault()
        dispatch(updateUser({ values }))
    }

    const handleChange = ({ target: { value, name } }) => {
        setValues({ ...values, [name]: value })
    }


    return (
        <div className={styles.wrapper}>
            <form className={styles.form} onSubmit={updateUserHandler} >

                <div className={styles.group}>
                    <input type="email" name="email" value={values.email} placeholder='Type email...' autoComplete='off' onChange={handleChange} />
                </div>

                <div className={styles.group}>
                    <input type="name" name="name" value={values.name} placeholder='Type name...' autoComplete='off' onChange={handleChange} />
                </div>

                <button type="submit" className={styles.submit}>Update user</button>
            </form>
        </div >

    );
};

export default UserUpdateForm;
