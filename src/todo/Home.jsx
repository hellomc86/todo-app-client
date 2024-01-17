import Feed from "./Feed";
import MainContext from "../api/context";

import { useContext } from "react";

const Home = ({ isLoading, fetchError }) => {
  const {   
    searchResults
  } = useContext(MainContext);
 
  return (
    <main className="Home">
      {isLoading && <p className="statusMsg"> Loading posts ... </p>}
      {!isLoading && fetchError && <p className="statusMsg" style = {{color: "red"}}> { fetchError }</p>}
      {!isLoading && !fetchError && 
      (searchResults && searchResults.length ? 
        <Feed posts={searchResults} />
      :
        <p className="statusMsg" >
          No posts to display
        </p>
      )}
    </main>
  );
};

export default Home;
