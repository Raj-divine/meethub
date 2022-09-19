import styles from "./SectionFilter.module.scss";
import { SimpleGrid } from "@mantine/core";
import {
  BsCalendarEvent,
  BsCalendar,
  BsCalendarDay,
  BsCalendar3,
} from "react-icons/bs";
import FilterCard from "./FilterCard/FilterCard";
import { TbDiscount2 } from "react-icons/tb";
import { ImPriceTag } from "react-icons/im";
const filters = [
  {
    text: "Tomorrow",
    icon: <BsCalendarEvent size={20} color="#7718d1" />,
  },
  {
    text: "Today",
    icon: <BsCalendar size={20} color="#7718d1" />,
  },

  {
    text: "Free",
    icon: <TbDiscount2 size={25} color="#7718d1" />,
  },
  {
    text: "Paid",
    icon: <ImPriceTag size={20} color="#7718d1" />,
  },
  {
    text: "Friday",
    icon: <BsCalendarDay size={20} color="#7718d1" />,
  },
  {
    text: "This month",
    icon: <BsCalendar3 size={20} color="#7718d1" />,
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
            return <FilterCard filter={filter.text} icon={filter.icon} />;
          })}
        </SimpleGrid>
      </div>
    </section>
  );
};

export default SectionFilter;
