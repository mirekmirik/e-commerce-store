import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { sumBy } from '../../utils/common'
import { removeItemFromCart } from '../../features/user/userSlice'
import { Link } from 'react-router-dom'
import styles from '../../styles/Cart.module.css'


const Favourites = () => {

    const dispatch = useDispatch()
    const { favourites } = useSelector(({ user }) => user)

    const removeItem = (id) => {
        dispatch(removeItemFromCart(id))
    }

    return (
        <section className={styles.cart}>
            <h2 className={styles.title}>Your wishlist</h2>
            {!favourites.length ? (
                <div className={styles.empty}>Here is empty</div>
            ) : (
                <>
                    <div className={styles.list}>
                        {favourites.map((item) => {
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
                                    <div className={styles.close} onClick={() => removeItem(id)}>
                                        <svg className='icon'>
                                            <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#close`}></use>
                                        </svg>
                                    </div>

                                </div>
                            )
                        })}
                    </div>
                    {/* 
                    <div className={styles.actions}>
                        <div className={styles.total}>
                            TOTAL PRICE:{" "}
                            <span>
                                {sumBy(cart.map(({ quantity, price }) => quantity * price))}$
                            </span>
                        </div>

                        <button className={styles.proceed}>Proceed to checkout</button>
                    </div> */}
                </>

            )
            }
        </section >
    )
}

export default Favourites