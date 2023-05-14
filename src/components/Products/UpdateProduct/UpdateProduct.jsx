import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router'
import { ROUTES } from '../../../utils/routes'
import { getProduct, setErrorMessageReducer, updateProduct } from '../../../features/products/productsSlice'
import { Link } from 'react-router-dom'
import Spinner from '../../Spinner/Spinner'
import styles from '../../../styles/UpdateProduct.module.css'

const UpdateProduct = () => {

    const [success, setSuccess] = useState(null)

    const { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { currentUser } = useSelector(({ user }) => user)
    const { product, isLoading, errorMessage } = useSelector(({ products }) => products)

    const [values, setValues] = useState({
        title: "",
        price: '',
        description: '',
        categoryId: '',
        images: []
    })

    useEffect(() => {
        dispatch(getProduct(id))
    }, [id, dispatch])

    useEffect(() => {
        if (!product) return;
        setValues({
            id: product.id,
            categoryId: product.category.id,
            title: product.title,
            price: product.price,
            description: product.description,
            images: [...product.images]
        })
    }, [product])

    useEffect(() => {
        if (!currentUser) {
            navigate('/')
        }
        dispatch(setErrorMessageReducer(null))
        setSuccess(null)
    }, [navigate, dispatch, currentUser])



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

    const handleSubmit = async (event) => {
        try {
            event.preventDefault()
            const { images } = values
            const filter = images?.filter((el) => el !== '')
            const resultAction = await dispatch(updateProduct({ ...values, images: filter }))
            if (updateProduct.fulfilled.match(resultAction)) {
                setValues(product)
                setSuccess(`You have updated product!`)
            }
        } catch (error) {
            console.log(error)
            return;
        }
    }






    return (
        <section className={styles.product}>

            <form className={styles.form} onSubmit={handleSubmit}>
                <Link to={ROUTES.CREATED_PRODUCT}>
                    <button type='button'>Return to My Created Products</button>
                </Link>
                {isLoading ? <Spinner /> : (
                    <>
                        <div className={styles.feedback}>
                            {errorMessage && !isLoading && <span className={styles.error}>{errorMessage}</span>}
                            {success && !isLoading && <span className={styles.success}>{success}</span>}
                        </div>
                        Title Product
                        <div className={styles.group}>
                            <input type="text" name="title" value={values?.title} placeholder='Title Product...' autoComplete='off' onChange={handleChange} />
                        </div>
                        Price Product
                        <div className={styles.group}>
                            <input type="text" name="price" value={values?.price} placeholder='Price Product...' autoComplete='off' onChange={handleChange} />
                        </div>
                        Description Product
                        <div className={styles.group}>
                            <input type="text" name="description" placeholder='Description Product...' value={values?.description} autoComplete='off' onChange={handleChange} />
                        </div>
                        Images of Product
                        <div className={styles.group}>
                            <input type="text" name="images1" placeholder='Your image 1...' value={values?.images?.[0]} autoComplete='off' onChange={handleChange} />
                        </div>
                        Your image 2(optional)
                        <div className={styles.group}>
                            <input type="text" name="images2" placeholder='Your image 2...' value={values?.images?.[1]} autoComplete='off' onChange={handleChange} />
                        </div>
                        Your image 3(optional)
                        <div className={styles.group}>
                            <input type="text" name="images3" placeholder='Your image 3...' value={values?.images?.[2]} autoComplete='off' onChange={handleChange} />
                        </div>

                        <button type="submit" className={styles.submit}>Update Product</button>
                    </>

                )}
            </form>
        </section>
    )
}

export default UpdateProduct