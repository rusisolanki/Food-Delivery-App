import styles from './Modal.module.css'
import { Fragment } from 'react'
import ReactDOM from 'react-dom'


const Backdrops = (props) => {
    return(
        <div className={styles.backdrop} onClick={props.onClick}/>
    )
}
const ModalOverlay = (props) => {
    return(
        <div className={styles.modal}>
            <div className={styles.content}>{props.children}</div>
        </div>
    )
}

const portalElement = document.getElementById('overlays');

function Modal(props){
    return(
    <Fragment>
        {ReactDOM.createPortal(<Backdrops onClick={props.onHide}/>, portalElement)}
        {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElement)}
    </Fragment>
    )
}

export default Modal


