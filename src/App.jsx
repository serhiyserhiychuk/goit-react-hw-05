import axios from "axios";
import { Toaster } from "react-hot-toast";

import { useState, useEffect } from "react";

const App = () => {
  const [response, setResponse] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isMoreToLoad, setIsMoreToLoad] = useState(true);

  useEffect(() => {
    if (query === "") {
      return;
    }
    setIsMoreToLoad(true);
    async function handleSearch() {
      try {
        const url =
          "https://api.themoviedb.org/3/trending/movie/day?include_adult=false&language=en-US&page=1";

        const options = {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NGJkNTI2ODAzNTJjMDE0ZWZjZWQ5ZGFhYTUwMDllZiIsInN1YiI6IjY1ZTg4YTc4MzQ0YThlMDE3ZDNmOTQwOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.K7uRgoy410QIvHHOPnuEjqzjKZ2zF9nDWXjxlS2k7ls",
          },
        };

        axios
          .get(url, options)
          .then((response) => response.json())
          .then((response) => console.log(response))
          .catch((err) => console.error(err));
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    handleSearch();
  }, [query, page]);

  return (
    <>
      <Toaster />
    </>
  );
};

export default App;
