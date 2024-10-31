import { useState } from "react";

const useNewFolderModal = (toast, toastType, setToastType) => {
  // Open state
  const [isOpen, setIsOpen] = useState(false);

  const hanldeOpen = () => {
    setIsOpen(true);
  };
  const handleClose = (isCreated) => {
    // TO DO: add change state to folder and file loader
    setIsOpen(false);

    if (isCreated) {
      toast.handleOpen();
      setToastType({
        ...toastType,
        type: "success",
        message: "New folder created",
      });
    }
  };

  return { isOpen, hanldeOpen, handleClose };
};

export { useNewFolderModal };
