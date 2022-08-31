import {Fragment} from "react";
import HeaderCartButton from "./HeaderCartButton";
import mealsImage from "../../assets/meals.jpg"
import styles from "./Header.module.css";


const Header=(props)=>{
return <Fragment>
    <header className={styles.header} >
        <h1>React Meals</h1>
        <HeaderCartButton  onClick={props.showCart}>Cart</HeaderCartButton>
    </header>
    <div className={styles['main-image']}>
        <img src ={mealsImage} alt="food image!"/>
    </div>
</Fragment>
}


export default Header;