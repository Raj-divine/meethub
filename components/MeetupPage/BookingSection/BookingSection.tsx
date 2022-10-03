import { DocumentData } from "firebase/firestore";
import { Button } from "../../Utilities";
import styles from "./BookingSection.module.scss";

const BookingSection = ({ meetup }: DocumentData) => {
  const { price } = meetup;
  return (
    <div className={styles["booking-section"]}>
      <div className={styles.price}>{price ? `₹${price}` : "Free"}</div>
      <Button className={styles.button}>Book Now</Button>
    </div>
  );
};

export default BookingSection;
