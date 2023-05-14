import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { ROUTES } from '../../../utils/routes'
import CreateProductSVG from '../CreateProduct/CreateProductSVG'
import styles from '../../../styles/ListCreatedProduct.module.css'
import { deleteProduct, removeCreatedProduct } from '../../../features/products/productsSlice'
import Spinner from '../../Spinner/Spinner'

const ListCreatedProduct = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { createdProducts, errorMessage, isLoading } = useSelector(({ products }) => products)
    const { currentUser } = useSelector(({ user }) => user)
    useEffect(() => {
        if (!currentUser) {
            navigate('/')
        }
    }, [currentUser])

    const removeItem = async (id) => {
        try {
            await dispatch(deleteProduct(id))
            dispatch(removeCreatedProduct(id))
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <section className={styles.cart}>
            <Link to={ROUTES.CREATE_PRODUCT}><CreateProductSVG /></Link>
            <h2 className={styles.title}>Your created products</h2>
            {errorMessage && <span className={styles.error}>{errorMessage}</span>}
            {!createdProducts?.length ? (
                <div className={styles.empty}>Here is empty</div>
            ) : (
                <>
                    {isLoading && <Spinner />}
                    <div className={styles.list}>
                        {createdProducts?.map((item) => {
                            const { title, category, images, price, id } = item
                            return (
                                <div className={styles.item} key={id}>
                                    <div className={styles.image} style={{ backgroundImage: `url(${images[0]})` }}>
                                    </div>
                                    <Link to={`/products/${id}`}>
                                        <div className={styles.info}>
                                            <h3 className={styles.name}>{title}</h3>
                                            <div className={styles.category}>{category.name}</div>
                                        </div>
                                    </Link>
                                    <div className={styles.price}>{price}$</div>

                                    <div className={styles.update}>
                                        <Link to={{ pathname: `/update-product/${id}` }}><p>Update</p></Link>
                                    </div>
                                    
                                    <div className={styles.close} onClick={() => removeItem(id)}>
                                        <svg className='icon'>
                                            <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#close`}></use>
                                        </svg>
                                    </div>

                                </div>
                            )
                        })}
                    </div>
                </>
            )
            }
        </section >
    )
}

export default ListCreatedProduct