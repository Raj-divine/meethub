import styles from "./Button.module.scss";

type ButtonProps = {
  children: string;
  className?: string;
  onClick?: () => void;
};

const Button = ({ children, className, onClick }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`${styles["btn-primary"]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
