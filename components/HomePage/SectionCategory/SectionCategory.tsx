import styles from "./SectionCategory.module.scss";
import { SimpleGrid } from "@mantine/core";
import CategoryCard from "./CategoryCard/CategoryCard";
const SectionCategory = () => {
  return (
    <section className={styles["section-category"]}>
      <h2 className={styles.heading}>Browse by category</h2>
      <div>
        <SimpleGrid
          breakpoints={[
            { maxWidth: 1024, cols: 3 },
            { maxWidth: 450, cols: 3, spacing: "xs" },
          ]}
          cols={6}
        >
          <CategoryCard color="#ea580c" category="Fitness" />
          <CategoryCard color="#1d4ed8" category="Technology" />
          <CategoryCard color="#7e22ce" category="Networking" />
          <CategoryCard color="#be123c" category="Art" />
          <CategoryCard color="#0CA678" category="Casual" />
          <CategoryCard color="#25262B" category="Business" />
        </SimpleGrid>
      </div>
    </section>
  );
};

export default SectionCategory;
