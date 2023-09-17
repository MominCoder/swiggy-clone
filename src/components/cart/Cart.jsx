import { useSelector } from "react-redux";
import FoodItems from "./FoodItems.jsx";

export default function Cart() {
  const cartItems = useSelector((store) => store.cart.items);

  return (
    <div>
      {cartItems.length == 0 ? (
        <div className="flex h-[100vh] justify-center items-center">
          <img
            className="w-[400px]"
            src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-5521508-4610092.png"
            alt=""
          />
        </div>
      ) : (
        <div className="flex">
          <div style={{ flex: "4" }} className="flex flex-wrap">
            <FoodItems />
          </div>
        </div>
      )}
    </div>
  );
}
