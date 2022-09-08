import styles from "./Button.module.scss";

type ButtonProps = {
  children: string;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
};

const Button = ({ children, className, type, onClick }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`${styles["btn-primary"]} ${className}`}
      type={type ? type : "button"}
    >
      {children}
    </button>
  );
};

export default Button;
