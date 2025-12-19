import { Typography } from "@mui/material";
import HomePage from "../components/home components/HomePage";

const Home = ({ user, isLooged }) => (
  <>
    {isLooged ? (
      <>
        <HomePage />
      </>
    ) : (
      <>
        <Typography variant="h4" gutterBottom>
          Welcome to Home Page
        </Typography>
        <Typography variant="body1">
          Use the navigation bar to login and start adding tasks.
        </Typography>
      </>
    )}
  </>
);

export default Home;
