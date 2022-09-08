import styles from "./SignUpModal.module.scss";
import { Modal } from "@mantine/core";
import { useDispatch } from "react-redux";
import { closeModal } from "../../../context/modalSlice";
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
    <Modal title="hello" onClose={modalCloseHandler} opened={isOpen}>
      {!loggingIn && <div>this is the signUp Modal</div>}
      {loggingIn && <div>this is the login Modal</div>}
    </Modal>
  );
};

export default SignUpModal;
