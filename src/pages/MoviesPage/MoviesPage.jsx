import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import SearchForm from "../../components/SearchForm/SearchForm";
import MovieList from "../../components/MovieList/MovieList";
import { useSearchParams } from "react-router-dom";
import { getMoviesByQuery } from "../../movies-api";
import Loader from "../../components/Loader/Loader";

export default function MoviesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") ?? "";
  const onSubmit = (e) => {
    e.preventDefault();
    searchParams.set("query", e.target.elements.query.value);
    setSearchParams(searchParams);
    e.target.reset();
  };

  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        if (query !== "") {
          setIsLoading(true);
          const data = await getMoviesByQuery(query);
          if (data.length === 0) {
            toast.error("There are no movies with the query!");
          } else {
            setResponse(data);
          }
        }
      } catch {
        () => {
          toast.error("Something went wrong, try again!");
        };
      } finally {
        setIsLoading(false);
      }
    }
    getData();
  }, [query]);

  return (
    <>
      <SearchForm onSubmit={onSubmit} />
      {isLoading && <Loader />}
      {query !== "" && <MovieList movies={response} />}
    </>
  );
}
