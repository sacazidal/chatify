import { AuthModalProps, AuthModalType } from "@/types";
import Modal from "../Modal";
import { useState } from "react";
import LoginForm from "./LoginForm";

const AuthModal = ({
  isOpen,
  onClose,
  initialForm = "login",
}: AuthModalProps) => {
  const [currentForm, setCurrentForm] = useState<AuthModalType>(initialForm);

  function renderForm() {
    switch (currentForm) {
      case "login":
        return (
          <LoginForm
            onSwitch={() => setCurrentForm("register")}
            onRecovery={() => setCurrentForm("recovery")}
          />
        );
      case "register":
        return <div>register</div>;
      case "recovery":
        return <div>recovery</div>;
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {renderForm()}
    </Modal>
  );
};
export default AuthModal;
