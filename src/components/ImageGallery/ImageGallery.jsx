import css from "./ImageGallery.module.css";

import ImageCard from "../ImageCard/ImageCard";

const ImageGallery = ({ images, openModal }) => {
  return (
    <ul className={css.imageList}>
      {images.map(({ id, alt_description, urls, color }) => {
        return (
          <li key={id} className={css.imageItem}>
            <ImageCard
              alt_description={alt_description}
              urls={urls}
              color={color}
              openModal={openModal}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default ImageGallery;
