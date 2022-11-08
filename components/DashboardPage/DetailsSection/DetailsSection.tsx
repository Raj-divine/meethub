import { LoadingOverlay, Text, TextInput } from "@mantine/core";
import { DocumentData } from "firebase/firestore";
import { useState } from "react";
import { Button } from "../../Utilities";
import styles from "./DetailsSection.module.scss";
import submitHandler from "./utils/submitHandler";

type DetailsSectionProps = {
  user: DocumentData;
  getUserData: () => void;
};

const DetailsSection = ({ user, getUserData }: DetailsSectionProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [userData, setUserData] = useState({
    fullName: user.fullName,
    email: user.email,
  });
  const [errors, setErrors] = useState({ fullName: "", email: "" });
  return (
    <div className={styles["details-section"]}>
      <Text className={styles.heading}>Change Profile Data</Text>
      <form
        onSubmit={(event) => {
          submitHandler({
            event,
            userData,
            setErrors,
            getUserData,
            setIsVisible,
          });
        }}
        className={styles.form}
        noValidate
      >
        <LoadingOverlay visible={isVisible} overlayBlur={2} />
        <div className={styles["form-inputs"]}>
          <div className={styles["input-container"]}>
            <TextInput
              variant="filled"
              placeholder="John Smith"
              label="Full name"
              name="full name"
              required
              error={errors.fullName}
              value={userData.fullName}
              onChange={(e) =>
                setUserData((prevUser) => {
                  return { ...prevUser, fullName: e.target.value };
                })
              }
            />
          </div>
          <div className={styles["input-container"]}>
            <TextInput
              variant="filled"
              placeholder="example@example.com"
              label="Email"
              name="email"
              required
              error={errors.email}
              value={userData.email}
              onChange={(e) =>
                setUserData((prevUser) => {
                  return { ...prevUser, email: e.target.value };
                })
              }
            />
          </div>
        </div>

        <div className={styles.btn}>
          <Button type="submit">Change Details</Button>
        </div>
      </form>
    </div>
  );
};

export default DetailsSection;
