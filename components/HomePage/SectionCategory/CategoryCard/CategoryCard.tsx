import Link from "next/link";
import styles from "./CategoryCard.module.scss";
type CategoryCardProps = {
  color: string;
  category: string;
};

const CategoryCard = ({ color, category }: CategoryCardProps) => {
  return (
    <Link
      href={{
        pathname: "/meetups",
        query: { category: category.toLowerCase() },
      }}
      passHref
    >
      <div
        style={{ backgroundColor: color }}
        className={styles["category-card"]}
      >
        <div>{category}</div>
      </div>
    </Link>
  );
};

export default CategoryCard;
