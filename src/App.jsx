import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import axios from "axios";
import { Toaster } from "react-hot-toast";

import { useState, useEffect } from "react";

const App = () => {
  const [response, setResponse] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalImage, setModalImage] = useState({});
  const [isMoreToLoad, setIsMoreToLoad] = useState(true);

  useEffect(() => {
    if (query === "") {
      return;
    }
    setIsMoreToLoad(true);
    async function handleSearch() {
      try {
        const baseURL =
          "https://api.unsplash.com/search/photos?client_id=OZ4LcaR_w8EOzH6tuoKvWOmMgGbKqowTrf-FN000WKI";
        setIsLoading(true);
        const images = await axios.get(
          `${baseURL}&page=${page}&per_page=8&orientation=landscape&query=${query}`
        );
        if (images.data.results.length === 0) {
          setError(true);
        }
        if (images.data.total_pages <= 1) {
          setIsMoreToLoad(false);
        }
        if (page === 1) {
          setResponse(images.data.results);
        } else {
          setResponse((prevResponse) => [
            ...prevResponse,
            ...images.data.results,
          ]);
        }
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    handleSearch();
  }, [query, page]);

  const onSubmit = (newQuery) => {
    setResponse([]);
    setQuery(newQuery);
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage((page) => page + 1);
  };

  const handleModal = (image) => {
    setModalImage(image);
    setModalIsOpen(true);
  };
  function closeModal() {
    setModalIsOpen(false);
  }

  return (
    <>
      <Toaster />
      <SearchBar onSubmit={onSubmit} />
      {error ? (
        <ErrorMessage />
      ) : (
        <ImageGallery images={response} handleModal={handleModal} />
      )}
      {isLoading && <Loader />}
      {response.length !== 0 && !isLoading && isMoreToLoad && (
        <LoadMoreBtn loadMore={handleLoadMore} />
      )}
      {modalIsOpen && (
        <ImageModal
          isOpen={modalIsOpen}
          image={modalImage}
          closeModal={closeModal}
        />
      )}
    </>
  );
};

export default App;
