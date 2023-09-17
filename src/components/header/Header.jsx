import { BiSearch } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./header.css";

export default function Header({ search, setSearch, handleSearch }) {
  const cartItems = useSelector((store) => store.cart.items);

  return (
    <header>
      <div className="row flex flex_sb">
        <Link to="" title="Food Delivery Company" className="logo">
          <h1>Luqma</h1>
        </Link>

        <div className="flex searchBox">
          <input
            type="text"
            placeholder="Search dishes, cuisines, restaurants, ..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <BiSearch className="searchify" onClick={handleSearch} />
        </div>

        <nav>
          <ul className="flex flex_sb pointer">
            <li>
              <Link to="about">About</Link>
            </li>
            <li>
              <Link to="cart">Cart {cartItems.length}</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
