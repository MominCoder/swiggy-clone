import { FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa";

import "./footer.css";

export default function Footer() {
  return (
    <footer>
      <div className="row flex flex_sb">
        <p>©2023 Luqma</p>
        <div className="connect flex pointer">
          <FaFacebookF />
          <FaLinkedinIn />
          <FaTwitter />
        </div>
      </div>
    </footer>
  );
}
