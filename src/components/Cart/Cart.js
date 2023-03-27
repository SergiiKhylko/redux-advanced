import Card from "../UI/Card";
import styles from "./Cart.module.css";
import CartItem from "./CartItem";
import {useSelector} from "react-redux";


const Cart = props => {

  const items = useSelector(state => state.cart.items);
  const totalPrice = useSelector(state => state.cart.totalPrice);

  return (
    <Card className={styles.cart}>
      <h2>My Purchases</h2>
      <ul>
        {items.map(item => (
          <CartItem
            key={item.id}
            item={
              {
                id: item.id,
                title: item.title,
                quantity: item.quantity,
                total: item.totalPrice,
                price: item.price
              }
            }
          />
        ))}
      </ul>
      <div className={styles.total}>
        <span>Total ${totalPrice.toFixed(2)}</span>
      </div>
    </Card>
  );
};

export default Cart;
