import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export { CharacterDetail };

function CharacterDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const character = useSelector((state) =>
    state.characters.characters.find(
      (character) => character.id === parseInt(id)
    )
  );

  if (!character) {
    return <div>Loading character details or character not found...</div>;
  }

  const handleBackClick = () => {
    navigate("/characters");
  };

  return (
    <div className="container mt-5 p-5">
      <div className="card mb-3" style={{ maxWidth: "1240px" }}>
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src={character.image}
              alt={character.name}
              className="img-fluid rounded-start"
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h2 className="card-title">{character.name}</h2>
              <p className="card-text">
                <strong>Status:</strong> {character.status}
              </p>
              <p className="card-text">
                <strong>Species:</strong> {character.species}
              </p>
              <p className="card-text">
                <strong>Gender:</strong> {character.gender}
              </p>
              <p className="card-text">
                <strong>Location:</strong> {character.location.name}
              </p>
              <button onClick={handleBackClick} className="btn btn-primary">
                Back to Characters
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
