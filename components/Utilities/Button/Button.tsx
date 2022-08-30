import styles from "./Button.module.scss";

type ButtonProps = {
  children: string;
  className?: string;
};

const Button = ({ children, className }: ButtonProps) => {
  return (
    <button className={`${styles["btn-primary"]} ${className}`}>
      {children}
    </button>
  );
};

export default Button;
