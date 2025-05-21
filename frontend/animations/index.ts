import { Variants } from "framer-motion";

export const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

export const modalVariants: Variants = {
  hidden: { y: 50, opacity: 0, scale: 0.5 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: { type: "spring", damping: 20, stiffness: 300 },
  },
  exit: {
    y: 50,
    opacity: 0,
    scale: 0.5,
    transition: { duration: 0.2 },
  },
};
