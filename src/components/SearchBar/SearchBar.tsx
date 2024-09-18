import toast, { Toaster } from "react-hot-toast";
import css from "./SearchBar.module.css";
import { ChangeEvent, FormEvent, useState } from "react";

type SearchBarProps = {
  onSubmit: (value: string) => void;
};

const SearchBar = ({ onSubmit }: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
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
