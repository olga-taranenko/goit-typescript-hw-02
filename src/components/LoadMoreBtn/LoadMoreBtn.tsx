import css from "./LoadMoreBtn.module.css";

type ButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
  disabled: boolean;
};

const LoadMoreBtn = ({ children, onClick, disabled }: ButtonProps) => {
  return (
    <button className={css.button} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default LoadMoreBtn;
