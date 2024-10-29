import { useState } from "react";

const useNewFolderModal = () => {
  // Open state
  const [isOpen, setIsOpen] = useState(false);

  const hanldeOpen = () => {
    setIsOpen(true);
  };
  const handleClose = (isCreated) => {
    // TO DO: add change state to folder and file loader
    setIsOpen(false);
  };

  return { isOpen, hanldeOpen, handleClose };
};

export { useNewFolderModal };
