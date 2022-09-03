import styles from "./InfoCard.module.scss";
import Image, { StaticImageData } from "next/image";
import { useIntersection } from "@mantine/hooks";
import { useEffect, useState } from "react";
type InfoCardProps = {
  image: StaticImageData;
  body: string;
  title: string;
  alt: string;
};

const InfoCard = ({ image, body, title, alt }: InfoCardProps) => {
  const { ref: cardRef, entry } = useIntersection({
    threshold: 0.3,
  });
  const [isIntersecting, setIsIntersecting] = useState(false);
  useEffect(() => {
    if (entry?.isIntersecting && !isIntersecting) {
      setIsIntersecting(true);
    }
  }, [entry?.isIntersecting]);

  return (
    <div
      ref={cardRef}
      className={`${styles.card} ${isIntersecting ? styles.animate : ""}`}
    >
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
