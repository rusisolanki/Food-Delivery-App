import React from 'react';
import styles from './Header.module.css'
import meals from '../../assets/meals.jpg'
import CartButton from './CartButton';

export default function Header(props){
    return(
        <React.Fragment>
            <header className={styles.header}>
                <h1>ReactMeals</h1>
                <CartButton onClick={props.onShowCart}/>
            </header>
            <div className={styles['main-image']}>
                <img src={meals} alt="A table full of delicious food!" />
            </div>
        </React.Fragment>
    )
}