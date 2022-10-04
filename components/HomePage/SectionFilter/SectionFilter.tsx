import styles from "./SectionFilter.module.scss";
import { SimpleGrid } from "@mantine/core";
import {
  BsCalendarEvent,
  BsCalendar,
  BsCalendar3,
  BsFillArrowDownCircleFill,
  BsFillArrowUpCircleFill,
} from "react-icons/bs";
import FilterCard from "./FilterCard/FilterCard";
import { TbDiscount2 } from "react-icons/tb";
import { ImPriceTag } from "react-icons/im";
const filters = [
  {
    text: "Tomorrow",
    icon: <BsCalendarEvent size={20} color="#7718d1" />,
    filter: "tomorrow",
  },
  {
    text: "Today",
    icon: <BsCalendar size={20} color="#7718d1" />,
    filter: "today",
  },

  {
    text: "Free",
    icon: <TbDiscount2 size={25} color="#7718d1" />,
    filter: "free",
  },
  {
    text: "Paid",
    icon: <ImPriceTag size={20} color="#7718d1" />,
    filter: "paid",
  },
  {
    text: "Below 500",
    icon: <BsFillArrowDownCircleFill size={20} color="#7718d1" />,
    filter: "below-500",
  },
  {
    text: "Above 1000",
    icon: <BsFillArrowUpCircleFill size={20} color="#7718d1" />,
    filter: "above-1000",
  },
];

const SectionFilter = () => {
  return (
    <section className={styles["section-filter"]}>
      <h2 className={styles.heading}>Quickly filter events</h2>
      <div>
        <SimpleGrid
          breakpoints={[
            { maxWidth: 450, cols: 1 },
            { maxWidth: 1300, cols: 4 },
            { maxWidth: 950, cols: 3 },
            { maxWidth: 650, cols: 2 },
          ]}
          cols={6}
        >
          {filters.map((filter) => {
            return (
              <FilterCard
                key={filter.text}
                text={filter.text}
                icon={filter.icon}
                filter={filter.filter}
              />
            );
          })}
        </SimpleGrid>
      </div>
    </section>
  );
};

export default SectionFilter;
