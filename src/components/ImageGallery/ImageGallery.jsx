import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";

export default function ImageGallery({ images, handleModal }) {
  return (
    <ul className={css.list}>
      {images.map((image) => {
        return (
          <li
            className={css.item}
            key={image.id}
            onClick={() => handleModal(image)}
          >
            <ImageCard key={image.id} item={image} />
          </li>
        );
      })}
    </ul>
  );
}
