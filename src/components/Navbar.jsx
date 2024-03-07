import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../store";
import { FaHeart } from "react-icons/fa";
import { FavoritesModal } from "../pages/characters";

function Navbar() {
  const auth = useSelector((x) => x.auth.value);
  const dispatch = useDispatch();
  const logout = () => dispatch(authActions.logout());

  const favoritesCount = useSelector(
    (state) => state.characters.favoriteCharacters.length
  );
  const [showFavoritesModal, setShowFavoritesModal] = useState(false);

  const handleShowFavoritesModal = () => setShowFavoritesModal(true);

  if (!auth) return null;

  return (
    <nav className="navbar navbar-expand-lg navbar-light fixed-top bg-light mb-5 px-5">
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <NavLink className="nav-item nav-link" to="/">
            Home
          </NavLink>
          <NavLink className="nav-item nav-link" to="/users">
            Users
          </NavLink>
          <NavLink className="nav-item nav-link" to="/characters">
            Characters
          </NavLink>
        </div>
        <div className="navbar-nav ms-auto">
          <NavLink
            to="/characters"
            className={`nav-item nav-link border-none ${
              favoritesCount > 0 ? "" : "disabled"
            }`}
          >
            <button
              className={`nav-item nav-link border-none ${
                favoritesCount > 0 ? "" : "disabled"
              }`}
              onClick={handleShowFavoritesModal}
              disabled={favoritesCount === 0}
            >
              <FaHeart />
              {favoritesCount > 0 && (
                <span className="badge bg-danger">{favoritesCount}</span>
              )}
            </button>
          </NavLink>
          <button onClick={logout} className="nav-item nav-link btn btn-link">
            Logout
          </button>
        </div>
      </div>
      <FavoritesModal
        show={showFavoritesModal}
        onHide={() => setShowFavoritesModal(false)}
      />
    </nav>
  );
}

export { Navbar };
