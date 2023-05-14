import React from "react"
import styles from '../../styles/Products.module.css'
import { Link } from "react-router-dom"
import Spinner from "../Spinner/Spinner"

const Products = ({ title, style = {}, products = [], isLoading, amount, ref }) => {
    const list = products.filter((_, i) => i < amount)

    const oldPrice = (price) => {
        const oldPrice = Math.floor(price * 0.8)
        if (oldPrice === 0) {
            return ''
        } else {
            return oldPrice
        }
    }

    return (
        <section className={styles.products} style={style}>
            {title && <h2>{title}</h2>}
            <div className={styles.list}>
                {isLoading && <div className={styles.spinner}>
                    <Spinner />
                </div>}
                {list?.map(({ id, images, title, category: { name: cat }, price }, idx, arr) => {
                    return (
                        <Link to={`/products/${id}`} key={id} className={styles.product}>
                            <div className={styles.image} style={{ backgroundImage: `url(${images[0]})` }}></div>
                            <div className={styles.wrapper}>
                                <h3 className={styles.title}>{title}</h3>
                                <div className={styles.cat}>{cat}</div>
                                <div className={styles.info}>
                                    <div className={styles.prices}>
                                        <div className={styles.price}>{price}$</div>
                                        <div className={styles.oldPrice}>{oldPrice(price)}$</div>
                                    </div>
                                    <div className={styles.purchases}>3 purchases</div>
                                </div>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </section>
    )

}

export default Products