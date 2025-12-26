import Cards from "../components/home components/Cards";
import HomePage from "../components/home components/HomePage";

const Home = ({ isLoggedIn, user }) => {
  return (
    <div>
      {!isLoggedIn ? (
        <>
          <h1>Welcome to Home Page</h1>
          <p>Use the navigation bar to login and start adding tasks.</p>
        </>
      ) : (
        <>
          <h2>Welcome, {user?.username}</h2>
          <HomePage />
        </>
      )}
    </div>
  );
};

export default Home;
