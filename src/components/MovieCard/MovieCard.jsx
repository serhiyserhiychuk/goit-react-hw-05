import { Suspense } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { Link, Outlet } from "react-router-dom";
import css from "./MovieCard.module.css";
import Loader from "../Loader/Loader";

export default function MovieCard({ movie, backLink }) {
  if (movie.length !== 0) {
    return (
      <>
        <button className={css.button}>
          <Link to={backLink}>
            <FaArrowLeft size={16} />
            Go Back
          </Link>
        </button>
        <div className={css.maindiv}>
          <img
            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
            alt="poster"
          />
          <div className={css.div}>
            <h2>{`${movie.title}(${movie.release_date.slice(0, 4)})`}</h2>
            <p>{movie.tagline}</p>
            <p>User Score: {parseInt(movie.vote_average * 10)}%</p>
            <h3>Overview</h3>
            <p>{movie.overview}</p>
            <h3>Genres</h3>
            <ul className={css.list}>
              {movie.genres.map((genre) => (
                <li key={genre.id}>{genre.name}</li>
              ))}
            </ul>
          </div>
        </div>
        <ul className={css.info}>
          <li>
            <Link to={`/movies/${movie.id}/cast`}>Cast</Link>
          </li>
          <li>
            <Link to={`/movies/${movie.id}/reviews`}>Reviews</Link>
          </li>
        </ul>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </>
    );
  }
}
