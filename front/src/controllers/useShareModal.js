import { useState } from "react";

const useShareModal = () => {
  // Open state
  const [isOpen, setIsOpen] = useState(false);
  const [params, setParams] = useState();

  // Close handler
  const handleOpen = (name, id, type, e) => {
    setParams({ name, id, type, e });
    setIsOpen(true);
  };

  // Open handler
  const handleClose = () => {
    setIsOpen(false);
  };

  return { isOpen, params, handleOpen, handleClose };
};

export { useShareModal };
