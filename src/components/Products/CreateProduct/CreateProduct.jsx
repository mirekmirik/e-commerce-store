import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { createProduct, setErrorMessageReducer } from '../../../features/products/productsSlice'
import { ROUTES } from '../../../utils/routes'
import { Link } from 'react-router-dom'
import styles from '../../../styles/CreateProduct.module.css'
import Spinner from '../../Spinner/Spinner'


const CreateProduct = () => {

    const defaultValues = {
        title: "",
        price: '',
        description: '',
        categoryId: '',
        images: []
    }



    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isLoading, errorMessage, createdProduct } = useSelector(({ products }) => products)
    const { currentUser } = useSelector(({ user }) => user)

    const [success, setSuccess] = useState(null)
    const [values, setValues] = useState(defaultValues)


    useEffect(() => {
        if (!currentUser) {
            navigate('/')
        }
        dispatch(setErrorMessageReducer(null))
        setSuccess(null)
        setValues(defaultValues)
    }, [])






    const handleChange = ({ target: { name, value } }) => {
        if (name.startsWith('images')) {
            const index = Number(name.slice(-1)) - 1;
            const newImages = [...values.images];
            newImages[index] = value;
            setValues(prevState => ({ ...prevState, images: newImages }));
        } else {
            setValues(prevState => ({ ...prevState, [name]: value }));
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault()
        const { images } = values
        const filter = images.filter((el) => el !== '')
        dispatch(createProduct({ ...values, images: filter }))
        setValues(defaultValues)
        setSuccess(`You have created product!`)
    }




    return (
        <section className={styles.product}>

            <form className={styles.form} onSubmit={handleSubmit}>
                <Link to={ROUTES.CREATED_PRODUCT}>
                    <button type='button'>My created products</button>
                </Link>
                {isLoading && <Spinner />}
                <div className={styles.feedback}>
                    {errorMessage && !createdProduct && !isLoading && <span className={styles.error}>{errorMessage}</span>}
                    {success && createdProduct && !isLoading && <span className={styles.success}>{success}</span>}
                </div>
                ID Product (Category(only number from 1 to 5))
                <div className={styles.group}>
                    <input type="id" name="categoryId" value={values.categoryId} placeholder='ID Product...' autoComplete='off' onChange={handleChange} />
                </div>
                Title Product
                <div className={styles.group}>
                    <input type="title" name="title" value={values.title} placeholder='Title Product...' autoComplete='off' onChange={handleChange} />
                </div>
                Price Product
                <div className={styles.group}>
                    <input type="price" name="price" value={values.price} placeholder='Price Product...' autoComplete='off' onChange={handleChange} />
                </div>
                Description Product
                <div className={styles.group}>
                    <input type="description" name="description" placeholder='Description Product...' value={values.description} autoComplete='off' onChange={handleChange} />
                </div>
                Images of Product
                <div className={styles.group}>
                    <input type="text" name="images1" placeholder='Your image 1...' value={values.images?.[0] ? values.images?.[1] : ''} autoComplete='off' onChange={handleChange} />
                </div>
                Your image 2(optional)
                <div className={styles.group}>
                    <input type="text" name="images2" placeholder='Your image 2...' value={values.images?.[1] ? values.images?.[1] : ''} autoComplete='off' onChange={handleChange} />
                </div>
                Your image 3(optional)
                <div className={styles.group}>
                    <input type="text" name="images3" placeholder='Your image 3...' value={values.images?.[2] ? values.images?.[2] : ''} autoComplete='off' onChange={handleChange} />
                </div>

                <button type="submit" className={styles.submit}>Create Product</button>
            </form>
        </section>
    )
}

export default CreateProduct