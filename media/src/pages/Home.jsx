import Cards from "../components/home components/Cards";

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
          <Cards />
        </>
      )}
    </div>
  );
};

export default Home;
