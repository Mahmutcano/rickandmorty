import { useSelector } from "react-redux";

export { Home };

function Home() {
  const auth = useSelector((x) => x.auth.value);
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <div>
        <h1>Hi {auth?.firstName}!</h1>
        <p>Welcome Rick And Morty App</p>
      </div>
    </div>
  );
}
