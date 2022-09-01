import styles from "./InfoCard.module.scss";
import Image, { StaticImageData } from "next/image";
import handshake from "../../../../assets/images/handshake.jpg";

type InfoCardProps = {
  image: StaticImageData;
  body: string;
  title: string;
  alt: string;
};

const InfoCard = ({ image, body, title, alt }: InfoCardProps) => {
  return (
    <div className={styles.card}>
      <div className={styles["card-header"]}>
        <div className={styles["header-image"]}>
          <Image
            src={image}
            layout="intrinsic"
            alt={alt}
            objectFit="contain"
            placeholder="blur"
          />
        </div>
        <h4 className={styles["card-title"]}>{title}</h4>
      </div>
      <div className={styles["card-body"]}>
        <p className={styles["card-text"]}>{body}</p>
      </div>
    </div>
  );
};

export default InfoCard;
