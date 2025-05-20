"use client";

import { motion } from "framer-motion";
import { User2Icon } from "lucide-react";
import { Button } from "../ui/button";

const Auth = () => {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.99 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <Button className="flex gap-2 items-center cursor-pointer">
        <User2Icon />
        <p className="">Авторизация</p>
      </Button>
    </motion.div>
  );
};
export default Auth;
