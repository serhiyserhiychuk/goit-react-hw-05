import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import { getTrendingMovies } from "../../movies-api";
import css from "./HomePage.module.css";
import MovieList from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader";

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        const data = await getTrendingMovies();
        setResponse(data);
      } catch {
        () => {
          toast.error("Something went wrong, try again!");
        };
      } finally {
        setIsLoading(false);
      }
    }
    getData();
  }, []);
  return (
    <>
      <div className={css.div}>Trending today</div>
      {isLoading && <Loader />}
      <MovieList movies={response} />
    </>
  );
}
