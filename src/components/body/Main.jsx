import { useOutletContext } from "react-router-dom";
import BlankCards from "../shimmer/BlankCards";
import Cards from "./Cards";
import "./main.css";

export default function Main() {
  const [filteredResto] = useOutletContext();
  if (!filteredResto) {
    return <BlankCards />;
  }

  let card;

  if (filteredResto?.length === 0) {
    card = <li>No restaurant found</li>;
  } else {
    card = filteredResto.map((restaurant) => {
      return (
        <li key={restaurant?.info?.id} className="card">
          <Cards info={restaurant?.info} />
        </li>
      );
    });
  }

  return <ul className="flex cards align_start">{card}</ul>;
}
