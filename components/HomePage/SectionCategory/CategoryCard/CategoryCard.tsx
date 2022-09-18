import styles from "./CategoryCard.module.scss";
type CategoryCardProps = {
  color: string;
  category: string;
};

const CategoryCard = ({ color, category }: CategoryCardProps) => {
  return (
    <div style={{ backgroundColor: color }} className={styles["category-card"]}>
      <div>{category}</div>
    </div>
  );
};

export default CategoryCard;
