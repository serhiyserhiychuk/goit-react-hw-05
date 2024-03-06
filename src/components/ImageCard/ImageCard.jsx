import css from "./ImageCard.module.css";

export default function ImageCard({ item }) {
  return (
    <div className={css.container}>
      <img
        className={css.image}
        src={item.urls.small}
        alt={item.alt_description}
      />
    </div>
  );
}
