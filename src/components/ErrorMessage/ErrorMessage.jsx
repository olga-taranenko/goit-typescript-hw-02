import css from "./ErrorMessage.module.css";

const ErrorMessage = ({ children }) => {
  return <div className={css.errorText}>{children}</div>;
};

export default ErrorMessage;
