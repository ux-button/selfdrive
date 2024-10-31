import { useState } from "react";

const useToast = (toastType, setToastType) => {
  const [isOpen, setIsOpen] = useState();

  const handleOpen = () => {
    setIsOpen(true);
  };

  const hanldeClose = () => {
    setIsOpen(false);
    // Clearing toast messages and type
    setToastType({ ...toastType, type: "", message: "" });
  };

  return { isOpen, handleOpen, hanldeClose };
};

export { useToast };
