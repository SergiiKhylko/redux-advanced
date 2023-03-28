import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import {useDispatch, useSelector} from "react-redux";
import {Fragment, useEffect} from "react";
import StatusBarMessage from "./components/UI/StatusBarMessage";
import {getCartData, sendCartData} from "./store/cart-slice";

let isInitialRunning = true;

const App = () => {
  const isCartVisible = useSelector(state => state.main.isCartVisible);
  const cartState = useSelector(state => state.cart);
  const statusMessage = useSelector(state => state.main.statusMessage);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartData());
  },[]);

  useEffect(() => {
    if (isInitialRunning) {
      isInitialRunning = false;
      return;
    }

    if (cartState.isCartChanged) {
      dispatch(sendCartData(cartState));
    }
  }, [cartState]);

  return (
    <Fragment>
      {statusMessage &&
        <StatusBarMessage
          status={statusMessage.status}
          title={statusMessage.title}
          message={statusMessage.message}
        />
      }
      <Layout>
        {isCartVisible && <Cart/>}
        <Products/>
      </Layout>
    </Fragment>
  );
}

export default App;
