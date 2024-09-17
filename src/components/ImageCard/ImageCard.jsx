import css from "./ImageCard.module.css";

const ImageCard = ({ alt_description, urls, color, openModal }) => {
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
