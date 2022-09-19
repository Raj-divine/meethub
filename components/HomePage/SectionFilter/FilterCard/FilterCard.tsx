import styles from "./FilterCard.module.scss";
import { ReactNode } from "react";
type FilterCardProps = {
  filter: string;
  icon: ReactNode;
};
const FilterCard = ({ filter, icon }: FilterCardProps) => {
  return (
    <div className={styles["filter-card"]}>
      <div>{filter}</div>
      <div className={styles["icon-container"]}>{icon}</div>
    </div>
  );
};

export default FilterCard;
