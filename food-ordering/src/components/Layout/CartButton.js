import React, {useContext, useState, useEffect} from 'react'
import styles from './CartButton.module.css'
import CartIcon from '../Cart/CartIcon'
import CartContext from '../../store/cart-context'

export default function CartButton(props){
    const [btnIsHighlighted, setBtnIsHighlighted] = useState(false)
    const cartCtx = useContext(CartContext)
    const { items } = cartCtx
    const numberOfCartItems = items.reduce((cartNumber, item)=>{
        return cartNumber + item.amount
    }, 0)

    const btnClasses = `${styles.button} ${btnIsHighlighted ? styles.bump : ""}`

    useEffect(() => {
        if(items.length === 0){
            return;
        }
        setBtnIsHighlighted(true)

        const timer = setTimeout(() => {
            setBtnIsHighlighted(false)
        }, 300);

        return () => {
            clearTimeout(timer)
        }
    }, [items])

    return(
        <button className={btnClasses} onClick={props.onClick}>
            <span className={styles.icon}>
                <CartIcon/>
            </span>
            <span>Cart</span>
            <span className={styles.badge}>{numberOfCartItems}</span>
        </button>
    )
}