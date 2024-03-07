import { useState } from "react";
import SearchForm from "../../components/SearchForm/SearchForm";
import MovieList from "../../components/MovieList/MovieList";

export default function MoviesPage() {
  const [query, setQuery] = useState("");
  const onSubmit = (e) => {
    e.preventDefault();
    setQuery(e.target.elements.query.value);
    e.target.reset();
  };
  return (
    <>
      <SearchForm onSubmit={onSubmit} />
      {query !== "" && <MovieList query={query} />}
    </>
  );
}
