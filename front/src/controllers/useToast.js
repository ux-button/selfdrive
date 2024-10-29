import { useState } from "react";

const useToast = () => {
  const [isOpen, setIsOpen] = useState(false);

  const hanldeClose = () => {
    setIsOpen(false);
  };

  return { isOpen, hanldeClose };
};

export { useToast };
