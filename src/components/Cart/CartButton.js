import styles from "./CartButton.module.css";

const CartButton = props => {
  return (
    <button className={styles.button}>
      <span>Cart</span>
      <span className={styles.badge}>2</span>
    </button>
  );
};

export default CartButton;
