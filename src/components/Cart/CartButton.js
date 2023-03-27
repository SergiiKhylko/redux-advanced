import styles from "./CartButton.module.css";
import {useDispatch, useSelector} from "react-redux";
import {mainActions} from "../../store/main-slice";

const CartButton = props => {

  const dispatcher = useDispatch();

  const cartVisibilityHandler = () => {
    dispatcher(mainActions.toggleCartVisibility());
  };

  const itemsQuantity = useSelector(state => state.cart.itemsQuantity);

  return (
    <button className={styles.button} onClick={cartVisibilityHandler} >
      <span>Cart</span>
      <span className={styles.badge}>{itemsQuantity}</span>
    </button>
  );
};

export default CartButton;
