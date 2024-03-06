import css from "./SearchBar.module.css";
import { GoSearch } from "react-icons/go";
import toast from "react-hot-toast";

export default function SearchBar({ onSubmit }) {
  return (
    <>
      <header className={css.header}>
        <form
          className={css.form}
          onSubmit={(e) => {
            e.preventDefault();
            if (e.target.elements.query.value.trim() === "") {
              toast.error("Enter text to search for images!");
              return;
            } else {
              onSubmit(e.target.elements.query.value);
              e.target.elements.query.value = "";
            }
          }}
        >
          <input
            className={css.input}
            type="text"
            name="query"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
          <button className={css.button} type="submit">
            <GoSearch size={24} />
          </button>
        </form>
      </header>
    </>
  );
}
