import axios from "axios";
import { useRef, useState } from "react";
import { useLocation } from "react-router-dom";

const useUploadModal = (toast, toastType, setToastType) => {
  // Open state of modal
  const [isOpen, setIsOpen] = useState(false);
  // Upload file
  const [uploadFile, setUploadFile] = useState(null);
  // Pathname
  const { pathname } = useLocation();

  // Open modal
  const handleOpen = () => {
    setIsOpen(true);
  };

  // Close modal
  const hanldeClose = (isCreated) => {
    setIsOpen(false);

    // Success toast
    if (isCreated) {
      toast.handleOpen();
      setToastType({
        ...toastType,
        type: "success",
        message: "File successfully uploaded",
      });
    }
  };

  // Open upload system os window
  const handleUploadFile = (event) => {
    setUploadFile(event.target.files[0]);
  };

  // Release file when close
  const handleRelease = () => {
    setUploadFile(null);
    hanldeClose();
  };

  // Uploading files logic
  const handleSendUploadFile = async () => {
    const formData = new FormData();
    formData.append("file", uploadFile);
    formData.append("pathname", pathname);

    if (!uploadFile) {
      return console.log("No file");
    }

    try {
      await axios.post(
        "https://storageapp-krmz.onrender.com/api/files",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      hanldeClose(true);
    } catch (err) {
      console.log("Upload error");
    }
  };

  return {
    isOpen,
    handleOpen,
    hanldeClose,
    handleSendUploadFile,
    handleUploadFile,
    handleRelease,
    uploadFile,
  };
};

export { useUploadModal };
