import ProductItem from "./ProductItem";
import styles from "./Products.module.css";

const DUMMY_ITEMS = [
  {
    id: "1",
    title: "High Quality Product 1",
    price: 7,
    description: "Due to its high quality, this product will serve you for a very long time."
  },
  {
    id: "2",
    title: "High Quality Product 2",
    price: 9,
    description: "Due to its high quality, this product will serve you for a very long time."
  },
  {
    id: "3",
    title: "High Quality Product 3",
    price: 2,
    description: "Due to its high quality, this product will serve you for a very long time."
  }
];



const Products = props => {
  return (
    <section className={styles.products}>
      <h2>Our store has the highest quality products</h2>
      <ul>
        {DUMMY_ITEMS.map(item =>
          <ProductItem
            key={item.id}
            id={item.id}
            title={item.title}
            price={item.price}
            description={item.description}
          />
        )}
      </ul>
    </section>
  );
};

export default Products;
