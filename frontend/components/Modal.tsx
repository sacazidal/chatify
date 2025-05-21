import { backdropVariants, modalVariants } from "@/animations";
import useModal from "@/hooks/useModal";
import { ModalProps } from "@/types";
import { AnimatePresence, motion } from "framer-motion";

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  useModal({ isOpen, onClose });

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            variants={backdropVariants}
            onClick={onClose}
          />
          <motion.div
            className="relative bg-white dark:bg-neutral-800 rounded-lg max-w-md w-full shadow-xl mx-auto z-10"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
export default Modal;
