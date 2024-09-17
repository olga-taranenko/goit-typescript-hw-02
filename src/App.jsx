import { useEffect, useState } from "react";

import "./App.css";
import SearchBar from "./components/SearchBar/SearchBar";
import { requestAllImages } from "./components/services/api";
import ImageGallery from "./components/ImageGallery/ImageGallery";
// import toast from "react-hot-toast";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";

function App() {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [urlModal, setUrlModal] = useState("");
  const [altModal, setAltModal] = useState("");

  useEffect(() => {
    if (!query) {
      return;
    }
    const fetchImages = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const { results, total_pages } = await requestAllImages(query, page);

        if (!results.length) {
          setIsEmpty(true);
        }
        setImages((prevImages) => [...prevImages, ...results]);

        setIsVisible(page < total_pages);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchImages();
  }, [page, query]);

  const handleSubmit = (value) => {
    setQuery(value);
    setImages([]);
    setPage(1);
    setIsVisible(false);
    setIsEmpty(false);
    setError(null);
  };

  const onLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const openModal = (url, alt) => {
    setShowModal(true);
    setUrlModal(url);
    setAltModal(alt);
  };

  const closeModal = () => {
    setShowModal(false);
    setUrlModal("");
    setAltModal("");
  };

  return (
    <div className="container">
      <SearchBar onSubmit={handleSubmit} />
      {images.length > 0 && (
        <ImageGallery images={images} openModal={openModal} />
      )}
      {showModal && (
        <ImageModal
          isOpen={showModal}
          urlModal={urlModal}
          altModal={altModal}
          closeModal={closeModal}
        />
      )}
      {isVisible && (
        <LoadMoreBtn onClick={onLoadMore} disabled={isLoading}>
          {isLoading ? "Loading..." : "Load more"}
        </LoadMoreBtn>
      )}
      {isLoading && <Loader />}
      {error && <ErrorMessage>Somethung went wrong - {error}</ErrorMessage>}
      {isEmpty && <ErrorMessage>Sorry, there are no images...</ErrorMessage>}
    </div>
  );
}

export default App;
