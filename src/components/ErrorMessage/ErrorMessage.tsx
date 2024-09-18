import css from "./ErrorMessage.module.css";

type Props = {
  children: React.ReactNode;
};

const ErrorMessage = ({ children }: Props) => {
  return <div className={css.errorText}>{children}</div>;
};

export default ErrorMessage;
