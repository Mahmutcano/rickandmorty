import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { characterActions } from "../../store";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export { FavoritesModal };

function FavoritesModal({ show, onHide }) {
  const auth = useSelector((x) => x.auth.value);
  const favorites = useSelector((state) => state.characters.favoriteCharacters);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const removeFromFavorites = (id) => {
    if (auth) {
      dispatch(characterActions.removeFavorite(id));
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <Modal className="mt-5" show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Favorites</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {favorites.length > 0 ? (
            favorites.map((character) => (
              <div
                key={character.id}
                className="d-flex justify-content-between align-items-center mb-3"
              >
                <div className="d-flex align-items-center">
                  <img
                    src={character.image}
                    alt={character.name}
                    style={{ width: "50px", marginRight: "10px" }}
                  />
                  <div>{character.name}</div>
                </div>
                <Button
                  variant="danger"
                  onClick={() => removeFromFavorites(character.id)}
                >
                  <FaTrash />
                </Button>
              </div>
            ))
          ) : (
            <p className="d-flex align-items-center">
              Favorite Character Not Available
            </p>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}
