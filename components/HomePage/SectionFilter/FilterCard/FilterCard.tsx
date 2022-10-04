import styles from "./FilterCard.module.scss";
import { ReactNode } from "react";
import Link from "next/link";
type FilterCardProps = {
  filter: string;
  icon: ReactNode;
  text: string;
};
const FilterCard = ({ text, icon, filter }: FilterCardProps) => {
  return (
    <Link
      href={{
        pathname: "/meetups",
        query: { filter },
      }}
      passHref
    >
      <div className={styles["filter-card"]}>
        <div>{text}</div>
        <div className={styles["icon-container"]}>{icon}</div>
      </div>
    </Link>
  );
};

export default FilterCard;
