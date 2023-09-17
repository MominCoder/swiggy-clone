import { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import { RiTimerFill } from "react-icons/ri";
import { IMG_CDN_URL, RESTO_MENU_URL } from "../../config";
import { addItem } from "../../redux/slices/cartSlice";
import { useDispatch } from "react-redux";
import "./resto.css";

export default function Resto() {
  const [restoMenu, latitude, longitude] = useOutletContext();
  const { restoId } = useParams();
  const [restoDetails, setRestoDetails] = useState({});
  const [menu, setMenu] = useState([]);
  const dispatch = useDispatch();

  const handleClick = (item) => {
    dispatch(addItem(item));
  };

  useEffect(() => {
    getRestoDetail();
  }, []);

  async function getRestoDetail() {
    const response = await fetch(
      `${RESTO_MENU_URL}&lat=${latitude}&lng=${longitude}&restaurantId=${restoId}`
    );
    const apiData = await response.json();
    let filterMenu = [];

    let dishes =
      apiData?.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards;

    if (dishes) {
      for (const sep of dishes) {
        if (sep?.card?.card?.itemCards !== undefined) {
          for (const fArr of sep?.card?.card?.itemCards) {
            filterMenu.push(fArr?.card?.info);
          }
        }
      }
    }

    setRestoDetails(apiData?.data?.cards[0]?.card?.card?.info);
    // console.log("data ====>", apiData?.data?.cards[0]?.card?.card?.info)
    // setRestoDetails([...new Set(apiData?.data?.cards[0]?.card?.card?.info)]);
    setMenu([...new Set(filterMenu)]);
  }

  return (
    restoDetails && (
      <>
        <div className="main">
          <div className="resto_header_container">
            <div className="flex flex_sb resto_header">
              <div>
                <h2 className="resto_name">{restoDetails?.name}</h2>
                <p>{restoDetails?.cuisines?.toString()}</p>
                <p>{restoDetails?.areaName}</p>
              </div>
              <div className="rating">
                <p>
                  <FaStar />
                  {restoDetails?.avgRatingString}
                </p>
                <p>{restoDetails?.totalRatingsString}</p>
              </div>
            </div>
            <p>{restoDetails?.expectationNotifiers?.map((exp) => exp?.text)}</p>
            <hr className="dottedSeparator" />
            <div className="flex sla">
              <p className="flex">
                <RiTimerFill className="icon" />
                {restoDetails?.sla?.slaString}
              </p>
              <p className="flex">
                <HiOutlineCurrencyRupee className="icon" />{" "}
                {restoDetails?.costForTwoMessage}
              </p>
            </div>
          </div>
          <ul className="flex coupons">
            {restoDetails?.aggregatedDiscountInfo?.descriptionList.map(
              (offer, i) => (
                <li key={i} className="offer_card">
                  <p>{offer.meta.split("|")[0]}</p>
                  <p>{offer.meta.split("|")[1]}</p>
                </li>
              )
            )}
          </ul>
        </div>
        <ul className="flex  column menu">
          {menu &&
            menu?.map((items, i) => (
              <li key={i} className="flex flex_sb menu_card">
                <div>
                  <h3>{items?.name}</h3>
                  <span>
                    ₹ {items?.defaultPrice / 100 || items?.price / 100}
                  </span>
                </div>

                <div>
                  <figure className="dish">
                    <img
                      src={`${IMG_CDN_URL}/${items.imageId}`}
                      alt={items?.name}
                    />
                  </figure>
                  <button
                    className="addToCart pointer"
                    onClick={() => handleClick(items)}
                  >
                    Add
                  </button>
                </div>
              </li>
            ))}
        </ul>
      </>
    )
  );
}
