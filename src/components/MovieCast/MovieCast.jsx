import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import { getMovieCastById } from "../../movies-api";
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import css from "./MovieCast.module.css";

export default function MovieCast() {
  const [isLoading, setIsLoading] = useState(false);
  const { movieId } = useParams();
  const [response, setResponse] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        const data = await getMovieCastById(movieId);
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
  }, [movieId]);
  return (
    <>
      {isLoading && <Loader />}
      <ul className={css.list}>
        {response.map((actor) => {
          return (
            <li key={actor.id}>
              <img
                src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                alt="actor"
              />
              <p>{actor.character}</p>
              <p>{actor.name}</p>
            </li>
          );
        })}
      </ul>
    </>
  );
}
