import axios from "axios";
import { useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "./Button";

const UploadFileModal = ({ isOpen, handleClose }) => {
  const [uploadFile, setUploadFile] = useState(null);

  // File selected to upload
  const fileToUpload = useRef(null);

  // Pathname
  const { pathname } = useLocation();

  // Open upload system os window
  const handleUploadFile = (event) => {
    setUploadFile(event.target.files[0]);
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
      const response = await axios.post(
        "http://localhost:5123/api/files",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log("Request sent");
      return handleClose();
    } catch (err) {
      console.log("Upload error");
    }
  };

  // Release file when close
  const handleRelease = () => {
    setUploadFile(null);
    handleClose();
  };

  if (!isOpen) {
    return;
  }

  return (
    <div className="w-screen h-screen absolute top-0 left-0 flex justify-center bg-slate-500 bg-opacity-40 items-center">
      <div className="w-80 py-8 px-6 rounded-xl bg-slate-50 text-3xl space-y-4 absolute">
        <input
          type="file"
          ref={fileToUpload}
          className="hidden"
          onChange={handleUploadFile}
        />
        <h2>Upload file</h2>
        <div className="flex space-x-2">
          {uploadFile ? (
            <Button handleSubmit={handleSendUploadFile}>Upload file</Button>
          ) : (
            <Button handleSubmit={() => fileToUpload.current.click()}>
              Select file
            </Button>
          )}
          <Button handleSubmit={handleRelease}>Close</Button>
        </div>
      </div>
    </div>
  );
};

export { UploadFileModal };
