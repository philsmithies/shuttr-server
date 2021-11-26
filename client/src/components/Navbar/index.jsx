import React, { useContext } from "react";
import "./index.css";
import { Link } from "react-router-dom";
import Axios from "axios";
import { UserContext } from "../../Contexts/UserContext";

export default function NavBar() {
  const data = useContext(UserContext);
  const logout = () => {
    Axios.get("/logout", {
      withCredentials: true,
    }).then((res) => {
      console.log(res.data);
      if (res.data === "success") {
        return (window.location.href = "/");
      }
    });
  };
  return (
    <nav>
      {data ? (
        <Link to="/">
          <img
            class="navbar_logo"
            src={process.env.PUBLIC_URL + "/images/shuttrlogo.png"}
            alt="header logo"
          />
        </Link>
      ) : null}

      {data ? (
        <Link to="/pages/profile" className="index-button">
          <li>Profile</li>
        </Link>
      ) : null}

      {data ? (
        <Link to="/pages/map" className="index-button">
          <li>Map</li>
        </Link>
      ) : null}

      {data ? (
        <Link to="/pages/discover" className="index-button">
          <li className="discover">Discover</li>
        </Link>
      ) : null}

      {data ? (
        <Link to="/pages/inspiration" className="index-button">
          <li>Inspiration</li>
        </Link>
      ) : null}

      {data ? (
        <Link to="/pages/imageUpload" className="index-button">
          <li>Upload</li>
        </Link>
      ) : null}

      {data ? (
        <Link to="/" onClick={logout} className="index-button">
          <li className="login">Logout</li>
        </Link>
      ) : null}

      {data ? null : (
        <Link to="/pages/login" className="login-button">
          <li className="login">Log In</li>
        </Link>
      )}
    </nav>
  );
}
