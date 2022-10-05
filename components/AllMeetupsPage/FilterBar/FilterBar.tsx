import styles from "./FIlterBar.module.scss";
import { Select, Text } from "@mantine/core";
import { category } from "../../../fakeData";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
const FilterBar = () => {
  const router = useRouter();

  const [categoryState, setCategoryState] = useState<string | null>(null);
  const [filterState, setFilterState] = useState<string | null>(null);

  useEffect(() => {
    setCategoryState(`${router.query.category ? router.query.category : null}`);
    setFilterState(`${router.query.filter ? router.query.filter : null}`);
  }, [router.query]);

  const categoryData = category.map((category) => {
    return {
      value: category.toLowerCase(),
      label: category,
    };
  });

  const filterChangeHandler = (value: string) => {
    router.replace({
      query: { ...router.query, filter: value },
    });
  };
  const categoryChangeHandler = (value: string) => {
    router.replace({
      query: { ...router.query, category: value },
    });
  };

  const filterData = [
    {
      value: "free",
      label: "Free",
    },
    {
      value: "paid",
      label: "Paid",
    },
    {
      value: "tomorrow",
      label: "Tomorrow",
    },
    {
      value: "today",
      label: "Today",
    },
    {
      value: "below-500",
      label: "Below 500",
    },
    {
      value: "above-1000",
      label: "Above 1000",
    },
  ];

  return (
    <div className={styles["filter-bar"]}>
      <div className={styles.container}>
        <Text className={styles.text} color="dimmed">
          Meetups that are
        </Text>
        <div className={styles["select-container"]}>
          <Select
            value={filterState}
            placeholder="Filter"
            onChange={filterChangeHandler}
            data={filterData}
          />
        </div>
        <div className={styles["select-container"]}>
          <Select
            value={categoryState}
            placeholder="Category"
            data={categoryData}
            onChange={categoryChangeHandler}
          />
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
