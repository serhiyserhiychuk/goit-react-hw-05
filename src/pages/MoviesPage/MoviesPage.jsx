import { useState } from "react";
import css from "./MoviesPage.module.css";
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
      <form className={css.form} onSubmit={onSubmit}>
        <input
          className={css.input}
          type="text"
          name="query"
          placeholder="Search movies with the title"
          required
        />
        <button className={css.button}>Search</button>
      </form>
      {query !== "" && <MovieList query={query} />}
    </>
  );
}
