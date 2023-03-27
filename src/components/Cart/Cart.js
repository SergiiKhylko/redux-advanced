import Card from "../UI/Card";
import styles from "./Cart.module.css";
import CartItem from "./CartItem";

const Cart = props => {
  return (
    <Card className={styles.cart}>
      <h2>My Purchases</h2>
      <ul>
        <CartItem
          item={{ title: "Product", quantity: 2, total: 14, price: 7 }}
        />
      </ul>
    </Card>
  );
};

export default Cart;
