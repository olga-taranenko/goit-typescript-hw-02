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
import { Image, Response } from "./types";

function App() {
  const [query, setQuery] = useState<string>("");
  const [images, setImages] = useState<Image[]>([]);
  const [error, setError] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [isEmpty, setIsEmpty] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const [showModal, setShowModal] = useState<boolean>(false);
  const [urlModal, setUrlModal] = useState<string>("");
  const [altModal, setAltModal] = useState<string>("");

  useEffect(() => {
    if (!query) {
      return;
    }
    const fetchImages = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const { results, total_pages }: Response = await requestAllImages(
          query,
          page
        );

        if (!results.length) {
          setIsEmpty(true);
        }
        setImages((prevImages) => [...prevImages, ...results]);

        setIsVisible(page < total_pages);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchImages();
  }, [page, query]);

  const handleSubmit = (value: string): void => {
    setQuery(value);
    setImages([]);
    setPage(1);
    setIsVisible(false);
    setIsEmpty(false);
    setError(null);
  };

  const onLoadMore = (): void => {
    setPage((prevPage: number): number => prevPage + 1);
  };

  const openModal = (url: string, alt: string): void => {
    setShowModal(true);
    setUrlModal(url);
    setAltModal(alt);
  };

  const closeModal = (): void => {
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
