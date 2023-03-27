import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import {useDispatch, useSelector} from "react-redux";
import {Fragment, useEffect} from "react";
import {mainActions} from "./store/main-slice";
import StatusBarMessage from "./components/UI/StatusBarMessage";

let isInitialRunning = true;

const App = () => {
  const isCartVisible = useSelector(state => state.main.isCartVisible);
  const cartState = useSelector(state => state.cart);
  const statusMessage = useSelector(state => state.main.statusMessage);
  const dispatcher = useDispatch();

  useEffect(() => {

    const sendCartData = async () => {
      dispatcher(mainActions.showStatusMessage({
        status: "pending",
        title: "Sending data",
        message: "Cart data is sending to the server..."
      }));
      const endpoint = "https://redux-advanced-practice-default-rtdb.firebaseio.com/cart.json";
      const response = await fetch(endpoint, {
        method: "PUT",
        body: JSON.stringify(cartState)
      });

      if (!response.ok) {
        throw new Error("Error during sending Cart data");
      }

      dispatcher(mainActions.showStatusMessage({
        status: "success",
        title: "Sending data is successful",
        message: "Cart data has been successfully sent to the server"
      }));
    }

    if (isInitialRunning) {
      isInitialRunning = false;
      return;
    }

    sendCartData().catch(e => {
      dispatcher(mainActions.showStatusMessage({
        status: "error",
        title: e.message,
        message: e.message
      }));
    });

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
