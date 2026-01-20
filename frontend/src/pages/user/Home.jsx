import { getRole } from "../../utils/auth";

const Home = () => {
  const role = getRole();

  return (
    <div>
      <h1>Hackathon Portal</h1>
      {role === "team" && <p>Welcome Team! Choose a problem and submit.</p>}
      {role === "admin" && <p>Welcome Admin! Manage the hackathon.</p>}
    </div>
  );
};

export default Home;
