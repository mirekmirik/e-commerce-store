import React from "react";
import styles from '../../styles/Footer.module.css'
import { ROUTES } from "../../utils/routes";
import LOGO from '../../images/logo.svg'
import { Link } from "react-router-dom";


const Footer = () => {
    return (
        <section className={styles.footer}>
            <div className={styles.logo}>
                <Link to={ROUTES.HOME}>
                    <img src={LOGO} alt="LOGO" />
                </Link>
            </div>

            <div className={styles.rights}>
                Developed by Miroslav
            </div>

            <div className={styles.socials}>
                <svg className="icon">
                    <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#instagram`}></use>
                </svg>
                <svg className="icon">
                    <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#facebook`}></use>
                </svg>
                <svg className="icon">
                    <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#youtube`}></use>
                </svg>
            </div>
        </section>
    );
}

export default Footer;
