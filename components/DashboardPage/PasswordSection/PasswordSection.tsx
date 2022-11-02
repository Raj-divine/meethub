import { LoadingOverlay, PasswordInput, Text } from "@mantine/core";
import { useState } from "react";
import { Button } from "../../Utilities";
import styles from "./PasswordSection.module.scss";
import submitHandler from "./utils/submitHandler";
const PasswordSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const initialFormData = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  };
  const initialErrors = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  };
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState(initialErrors);

  return (
    <div className={styles["password-section"]}>
      <Text className={styles.heading}>Change Password</Text>
      <form
        noValidate
        className={styles.form}
        onSubmit={(event) => {
          submitHandler({
            event,
            formData,
            setErrors,
            setFormData,
            setIsVisible,
          });
        }}
      >
        <LoadingOverlay visible={isVisible} overlayBlur={2} />
        <div className={styles["form-inputs"]}>
          <div className={styles["input-container"]}>
            <PasswordInput
              placeholder="Old Password"
              label="Old password"
              variant="filled"
              name="old password"
              required
              error={errors.oldPassword}
              value={formData.oldPassword}
              onChange={(e) =>
                setFormData((prevUser) => {
                  return { ...prevUser, oldPassword: e.target.value };
                })
              }
            />
          </div>
          <div className={styles["input-container"]}>
            <PasswordInput
              placeholder="New Password"
              label="New Password"
              variant="filled"
              name="new password"
              required
              error={errors.newPassword}
              value={formData.newPassword}
              onChange={(e) =>
                setFormData((prevUser) => {
                  return { ...prevUser, newPassword: e.target.value };
                })
              }
            />
          </div>
          <div className={styles["input-container"]}>
            <PasswordInput
              placeholder="Confirm Password"
              label="Confirm Password"
              variant="filled"
              name="confirm password"
              required
              error={errors.confirmPassword}
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData((prevUser) => {
                  return { ...prevUser, confirmPassword: e.target.value };
                })
              }
            />
          </div>
        </div>
        <div className={styles.btn}>
          <Button type="submit">Change Password</Button>
        </div>
      </form>
    </div>
  );
};

export default PasswordSection;
