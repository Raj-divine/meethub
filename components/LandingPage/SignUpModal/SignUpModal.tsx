import styles from "./SignUpModal.module.scss";
import { Modal } from "@mantine/core";
import { useDispatch } from "react-redux";
import { closeModal } from "../../../context/modalSlice";
import SignUpComp from "./SignUpComp/SignUpComp";
import LogInComp from "./LogInComp/LogInComp";

type SignUpModalProps = {
  isOpen: boolean;
  loggingIn: boolean;
};

const SignUpModal = ({ isOpen, loggingIn }: SignUpModalProps) => {
  const dispatch = useDispatch();

  const modalCloseHandler = () => {
    dispatch(closeModal());
  };

  return (
    <Modal
      overlayBlur={1.5}
      title={loggingIn ? "Welcome Back!" : "Sign Up!"}
      onClose={modalCloseHandler}
      opened={isOpen}
      classNames={{
        title: styles.title,
        root: styles.modal,
      }}
    >
      {loggingIn && <LogInComp />}
      {!loggingIn && <SignUpComp />}
    </Modal>
  );
};

export default SignUpModal;
