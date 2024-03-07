import axios from "axios";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import css from "./MovieList.module.css";

export default function MovieList({ query }) {
  const [response, setResponse] = useState([]);
  const [url, setUrl] = useState(
    "https://api.themoviedb.org/3/trending/movie/day?include_adult=false&language=en-US&page=1"
  );

  useEffect(() => {
    if (query !== "") {
      setUrl(
        `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`
      );
    }

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
      .then((response) => {
        if (response.data.results.length !== 0) {
          setResponse(response.data.results);
        } else {
          toast.error("There`re no movies with the query!");
          return;
        }
      })
      .catch(() => toast.error("Something went wrong, try again!"));
  }, [url, query]);

  return (
    <ul className={css.list}>
      {response.map((movie) => (
        <li key={movie.id}>
          <Link to={`/movies/:${movie.id}`}>
            <span className={css.link}>{movie.title}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
