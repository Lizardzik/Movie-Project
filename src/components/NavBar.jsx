import { Link, useLocation } from "react-router-dom";
import "../css/NavBar.css";

function NavBar({ resetHomePage }) {
  // Get current location to handle active states and page reset
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" onClick={location.pathname === "/" ? resetHomePage : null}>
          CineStart
        </Link>
      </div>
      <div className="navbar-links">
        <Link
          to="/"
          className="nav-link"
          onClick={location.pathname === "/" ? resetHomePage : null}
        >
          Home
        </Link>
        <Link to="/series" className="nav-link">
          Series
        </Link>
        <Link to="/favorites" className="nav-link">
          Favorites
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;
