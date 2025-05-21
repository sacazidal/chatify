import { AuthModalProps, AuthModalType } from "@/types";
import Modal from "../Modal";
import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import RecoveryForm from "./RecoveryForm";

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
        return <RegisterForm onSwitch={() => setCurrentForm("login")} />;
      case "recovery":
        return (
          <RecoveryForm
            onBackToLogin={() => setCurrentForm("login")}
            onBackToSignUp={() => setCurrentForm("register")}
          />
        );
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {renderForm()}
    </Modal>
  );
};
export default AuthModal;
