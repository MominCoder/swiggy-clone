import { Link } from "react-router-dom";
import { IMG_CDN_URL } from "../../config";

export default function Cards({ info }) {
  const { id, name, avgRating, cloudinaryImageId } = info;
  return (
    <Link to={`/resto/${id}`}>
      <figure>
        <img src={`${IMG_CDN_URL}/${cloudinaryImageId}`} alt={name} />
      </figure>
      <h3>{name}</h3>
      <h4>{avgRating}</h4>
    </Link>
  );
}
