import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { userActions } from "../../store";

export { List };

function List() {
  const users = useSelector((x) => x.users.list);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userActions.getAll());
  }, []);

  return (
    <div className="container mt-3">
      <h1 className="text-center">Users</h1>
      <div className="d-flex filters gap-2 justify-content-end mb-5">
      <Link to="add" className="btn btn-sm btn-primary mb-2">
        Add User
      </Link>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th style={{ width: "30%" }}>First Name</th>
            <th style={{ width: "30%" }}>Last Name</th>
            <th style={{ width: "30%" }}>Username</th>
            <th style={{ width: "10%" }}></th>
          </tr>
        </thead>
        <tbody>
          {users?.value?.map((user) => (
            <tr key={user.id}>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.username}</td>
              <td style={{ whiteSpace: "nowrap" }}>
                <Link
                  to={`edit/${user.id}`}
                  className="btn btn-sm btn-primary me-1"
                >
                  Edit
                </Link>
                <button
                  onClick={() => dispatch(userActions.delete(user.id))}
                  className="btn btn-sm btn-danger"
                  style={{ width: "60px" }}
                  disabled={user.isDeleting}
                >
                  {user.isDeleting ? (
                    <span className="spinner-border spinner-border-sm"></span>
                  ) : (
                    <span>Delete</span>
                  )}
                </button>
              </td>
            </tr>
          ))}
          {users?.loading && (
            <tr>
              <td colSpan="4" className="text-center">
                <span className="spinner-border spinner-border-lg align-center"></span>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
