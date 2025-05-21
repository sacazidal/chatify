"use client";

import { motion } from "framer-motion";
import { User2Icon } from "lucide-react";
import { Button } from "../ui/button";
import AuthModal from "../Auth/AuthModal";
import { useState } from "react";
import { AuthModalType } from "@/types";

const Auth = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authModalType, setAuthModalType] = useState<AuthModalType>("login");

  const handleClick = () => {
    setIsAuthModalOpen(true);
    setAuthModalType("login");
  };

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.99 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <Button
          onClick={handleClick}
          className="flex gap-2 items-center cursor-pointer"
        >
          <User2Icon />
          <p className="">Авторизация</p>
        </Button>
      </motion.div>

      <AuthModal
        isOpen={isAuthModalOpen}
        initialForm={authModalType}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </>
  );
};
export default Auth;
