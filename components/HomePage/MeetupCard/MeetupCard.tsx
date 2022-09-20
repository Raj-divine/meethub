import styles from "./MeetupCard.module.scss";

type MeetupCardProps = {
  meetup: {
    title: string;
    description: string;
    date: string;
    price: number;
    location: string;
    category: string;
    image: string;
    host: {
      uid: string;
      fullName: string;
      profilePicture: string;
    };
  };
};

const MeetupCard = ({ meetup }: MeetupCardProps) => {
  const { title, description, date, price, location, category, image, host } =
    meetup;
  return <div className={styles["meetup-card"]}>{title}</div>;
};

export default MeetupCard;
