import { Fragment } from "react";
import reactDom from "react-dom";
import styles from "./Modal.module.css";

const Backdrop=(props)=>{
return <div onClick={props.onClick} className={styles.backdrop}></div>
}

const ModalOverlay=(props)=>{
    return(
        <div className={styles.modal}>
            <div className={styles.content}>{props.children}</div>
        </div>
    )
}

const portalElement = document.getElementById('overlays');
const Modal=(props)=>{
    return <Fragment>
        {reactDom.createPortal(<Backdrop onClick={props.onClick}/>, portalElement)}
        {reactDom.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElement)}
    </Fragment>
}


export default Modal;