import toast, { Toaster } from "react-hot-toast";
import css from "./SearchBar.module.css";
import { useState } from "react";

const SearchBar = ({ onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!searchQuery.trim()) {
      const notify = () =>
        toast("Enter search query!", {
          duration: 3000,
          position: "top-center",
          style: { marginTop: 100 },
        });
      notify();

      return;
    }
    onSubmit(searchQuery);
    setSearchQuery("");
  };
  return (
    <header>
      <form className={css.form} onSubmit={handleSubmit}>
        <input
          value={searchQuery}
          onChange={handleChange}
          className={css.input}
          type="text"
          name="query"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
        <button className={css.btn} type="submit">
          Search
        </button>
      </form>
      <Toaster />
    </header>
  );
};

export default SearchBar;
