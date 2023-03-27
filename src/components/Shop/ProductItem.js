import Card from "../UI/Card";
import styles from "./ProductItem.module.css";
import {useDispatch} from "react-redux";
import {cartActions} from "../../store/cart-slice";

const ProductItem = props => {
  const dispatcher = useDispatch();
  const {id, title, price, description} = props;
  const addItemHandler = () => {
    dispatcher(cartActions.addItem({id, title, price}));
  };

  return (
    <li className={styles.item}>
      <Card>
        <header>
          <h3>{title}</h3>
          <div className={styles.price}>${price.toFixed(2)}</div>
        </header>
        <p>{description}</p>
        <div className={styles.actions}>
          <button onClick={addItemHandler}>Add to Cart</button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;
