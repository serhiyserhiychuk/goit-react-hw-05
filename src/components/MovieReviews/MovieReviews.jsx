import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import { getMovieReviewsById } from "../../movies-api";
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import css from "./MovieReviews.module.css";

export default function MovieReviews() {
  const [isLoading, setIsLoading] = useState(false);
  const { movieId } = useParams();
  const [response, setResponse] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        const data = await getMovieReviewsById(movieId);
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
      {response.length === 0 ? (
        <div>We don`t have any reviews for this movie.</div>
      ) : (
        <ul className={css.list}>
          {response.map((review) => {
            return (
              <li key={review.id}>
                <h3>Author: {review.author}</h3>
                <p>{review.content}</p>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
