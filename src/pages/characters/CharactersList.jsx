import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { characterActions, fetchCharactersByPage } from "../../store";
import { debounce } from "lodash";
import { Button } from "react-bootstrap";
import { FaHeart } from "react-icons/fa";

export function CharactersList() {
  const auth = useSelector((x) => x.auth.value);
  const { characters, info, status } = useSelector((state) => state.characters);
  const dispatch = useDispatch();

  const [selectFilters, setSelectFilters] = useState({
    status: "",
    species: "",
    type: "",
    gender: "",
  });

  const [searchFilter, setSearchFilter] = useState("");

  useEffect(() => {
    dispatch(
      characterActions.fetchFilteredCharacters({
        ...selectFilters,
        name: searchFilter,
      })
    );
  }, [selectFilters, searchFilter, dispatch]);

  const debouncedSearch = debounce((value) => {
    setSearchFilter(value);
  }, 500);

  const handleSelectFilterChange = (e) => {
    const { name, value } = e.target;
    setSelectFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const handleSearchChange = (e) => {
    debouncedSearch(e.target.value);
  };

  const handlePreviousPage = () => dispatch(fetchCharactersByPage(info.prev));
  const handleNextPage = () => dispatch(fetchCharactersByPage(info.next));

  return (
    <div className="container h-100">
      <h1 className="text-center">Rick and Morty Characters</h1>

      <div className="d-flex filters gap-2 justify-content-end">
        <select
          name="status"
          value={selectFilters.status}
          onChange={handleSelectFilterChange}
          className="form-control my-3"
        >
          <option value="">Select Status</option>
          <option value="alive">Alive</option>
          <option value="dead">Dead</option>
          <option value="unknown">Unknown</option>
        </select>
        <select
          name="gender"
          value={selectFilters.gender}
          onChange={handleSelectFilterChange}
          className="form-control my-3"
        >
          <option value="">Select Gender</option>
          <option value="female">Female</option>
          <option value="male">Male</option>
          <option value="genderless">Genderless</option>
          <option value="unknown">Unknown</option>
        </select>
        <input
          type="text"
          placeholder="Search by name..."
          className="form-control my-3"
          onChange={(e) => handleSearchChange(e)}
        />
      </div>

      <div className="row">
        {status === "failed" && (
          <div className="col-12 text-center h-100">
            <div className="text-danger" role="status">
              <span>No matching character found</span>
            </div>
          </div>
        )}
        {status === "loading" ? (
          <div className="col-12 text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          characters.map((character) => (
            <div className="col-md-3" key={character.id}>
              <CharacterCard character={character} auth={auth} />
            </div>
          ))
        )}
      </div>

      <div className="d-flex justify-content-between my-3">
        <Button onClick={handlePreviousPage} disabled={!info.prev}>
          Previous
        </Button>
        <Button onClick={handleNextPage} disabled={!info.next}>
          Next
        </Button>
      </div>
    </div>
  );
}

const CharacterCard = ({ character, auth }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddFavorite = () => {
    if (auth) {
      dispatch(characterActions.addFavorite(character.id));
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="card mb-4 shadow-sm">
      <img
        src={character.image}
        alt={character.name}
        className="card-img-top"
      />
      <div className="card-body">
        <h5 className="card-title">{character.name}</h5>
        <p className="card-text">Status: {character.status}</p>
        <p className="card-text">Species: {character.species}</p>
        <div className="d-flex justify-content-between align-items-center">
          <Link
            to={`characters/${character.id}`}
            className="btn btn-sm btn-outline-secondary"
          >
            View Details
          </Link>
          <button
            type="button"
            className="d-flex gap-2 justify-content-between align-items-center btn btn-sm btn-outline-primary"
            onClick={handleAddFavorite}
          >
            Add to Favorites
            <FaHeart />
          </button>
        </div>
      </div>
    </div>
  );
};
