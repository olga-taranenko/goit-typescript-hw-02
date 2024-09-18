import { Image, Urls } from "../../types";
import css from "./ImageCard.module.css";

interface ImageProps extends Omit<Image, "id"> {
  openModal: (url: string, alt: string) => void;
}

const ImageCard = ({ alt_description, urls, color, openModal }: ImageProps) => {
  return (
    <div
      className={css.thumb}
      style={{ backgroundColor: color, borderColor: color }}
    >
      <img
        src={urls.small}
        alt={alt_description}
        onClick={() => openModal(urls.regular, alt_description)}
      />
    </div>
  );
};

export default ImageCard;
