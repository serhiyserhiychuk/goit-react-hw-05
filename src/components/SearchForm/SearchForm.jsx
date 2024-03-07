import css from "./SearchForm.module.css";

export default function SearchForm({ onSubmit }) {
  return (
    <form className={css.form} onSubmit={onSubmit}>
      <input
        className={css.input}
        type="text"
        name="query"
        placeholder="Search movies with the title"
        required
      />
      <button className={css.button}>Search</button>
    </form>
  );
}
