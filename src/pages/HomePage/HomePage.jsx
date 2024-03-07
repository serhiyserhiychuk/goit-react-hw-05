import css from "./HomePage.module.css";
import MovieList from "../../components/MovieList/MovieList";

export default function HomePage() {
  return (
    <>
      <div className={css.div}>Trending today</div>
      <MovieList query={""} />
    </>
  );
}
