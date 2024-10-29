import { useState } from "react";

const useUploadModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {
    setIsOpen(true);
  };
  const hanldeClose = (isCreated) => {
    // TO DO: add change state to folder and file loader
    setIsOpen(false);

    // TO DO: apply tost logic here
    //isCreated && setIsToastVisible(true);
  };

  return { isOpen, handleOpen, hanldeClose };
};

export { useUploadModal };
