import toast from "react-hot-toast";
import { useState, useEffect, useRef } from "react";
import { getMovieDetailsById } from "../../movies-api";
import MovieCard from "../../components/MovieCard/MovieCard";
import { useLocation, useParams } from "react-router-dom";
import Loader from "../../components/Loader/Loader";

export default function MovieDetailsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { movieId } = useParams();
  const [response, setResponse] = useState([]);

  const location = useLocation();
  const backLinkRef = useRef(location.state ?? "/");

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        const data = await getMovieDetailsById(movieId);
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
      <MovieCard movie={response} backLink={backLinkRef.current} />
    </>
  );
}
