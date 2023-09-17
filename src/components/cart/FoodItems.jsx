import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { IMG_CDN_URL } from "../../config.js";

import {
  getTotal,
  removeFromCart,
  clearAll,
  incrementQuantity,
  decrementFromCart,
} from "../../redux/slices/cartSlice.js";

const FoodItems = () => {
  const cartItem = useSelector((store) => store.cart.items);
  const bill = useSelector((store) => store.cart.bill);

  const dispatch = useDispatch();

  const handleremoveFromCart = () => {
    dispatch(clearAll());
  };
  useEffect(() => {
    dispatch(getTotal());
  }, [bill]);

  const handleDecrement = (e) => {
    dispatch(decrementFromCart(e));
  };

  const handleIncrement = (itemId) => {
    dispatch(incrementQuantity(itemId));
  }

  return (
    <div className="container mx-auto ">
      <div className="flex shadow-md my-10">
        <div className="w-3/4 bg-white px-10 py-10">
          <div className="flex justify-between border-b pb-8">
            <h3 className="font-semibold text-2xl">All Items</h3>
          </div>
          <div>
            <div>
              <button
                onClick={() => handleremoveFromCart()}
                style={{
                  padding: "5px",
                  margin: "2px",
                }}
                className="bg-red-500 rounded-lg text-white"
              >
                clear cart
              </button>
            </div>
          </div>
          <div className="flex mt-10 mb-5">
            <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">
              Cart Details
            </h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
              Quantity
            </h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
              Price
            </h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
              Total
            </h3>
          </div>
          {cartItem.map((ele) => {
            return (
              <div
                key={ele.id}
                className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5"
              >
                <div className="flex w-2/5">
                  <div className="w-22">
                    <img
                      className="h-24 rounded-md"
                      style={{ width: "180px", height: "100px" }}
                      src={`${IMG_CDN_URL}/${ele.imageId}`}
                      alt=""
                    />
                  </div>
                  <div className="flex flex-col justify-between ml-4 flex-grow">
                    <span className="font-bold text-sm">{ele.name}</span>
                    <div>
                      <button
                        onClick={() => dispatch(removeFromCart(ele))}
                        style={{
                          padding: "5px 8px 5px 8px",
                          borderRadius: "10px",
                        }}
                        className="bg-green-500 font-semibold hover:text-red-500 text-white text-xs"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center w-1/5">
                  <span onClick={() => handleDecrement(ele.id)}>-</span>
                  <input
                    className="mx-2 border text-center w-8"
                    type="text"
                    value={ele.quantity || 1}
                    onChange={() => handleChange(ele.id)}
                  />
                  <span onClick={() => handleIncrement(ele.id)}>+</span>
                </div>
                <span className="text-center w-1/5 font-semibold text-sm">
                  {ele.price / 100 || ele.defaultPrice / 100}
                </span>
                <span className="text-center w-1/5 font-semibold text-sm">
                  {(parseInt(ele.quantity) || 1 * ele.price) / 100 ||
                    ele.defaultPrice / 100}
                </span>
              </div>
            );
          })}
        </div>

        <div id="summary" className="w-1/4 px-8 py-10">
          <h1 className="font-semibold text-2xl border-b pb-8">
            Order Summary
          </h1>
          <div className="flex justify-between mt-10 mb-5">
            <span className="font-semibold text-sm uppercase">
              {cartItem.length} Items
            </span>
            <span className="font-semibold text-sm">₹{bill}</span>
          </div>

          <div className="py-10">
            <label
              for="promo"
              className="font-semibold inline-block mb-3 text-sm uppercase"
            >
              Promo Code
            </label>
            <input
              type="text"
              id="promo"
              placeholder="Enter your code"
              className="p-2 text-sm w-full"
            />
          </div>
          <button className="bg-red-500 rounded-md hover:bg-red-600 px-5 py-2 text-sm text-white uppercase">
            Apply
          </button>
          <div className="border-t mt-8">
            <div className="flex font-semibold justify-between py-6 text-sm uppercase">
              <span>Total cost</span>
              <span>₹{bill}</span>
            </div>
            <Link to="/payment">
              <button className="bg-green-500 rounded-md font-semibold hover:bg-green-700 py-3 text-sm text-white uppercase w-full">
                Checkout
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodItems;
