import { FileIcon } from "../assets/FileIcon";
import { Button } from "./Button";
import { useRef } from "react";

const UploadFileModal = ({
  isOpen,
  handleClose,
  handleUploadFile,
  handleSendUploadFile,
  handleRelease,
  uploadFile,
}) => {
  // File selected to upload
  const fileToUpload = useRef(null);

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
        <div>
          {uploadFile && (
            <div className="flex space-x-2">
              <FileIcon />
              <p className="text-base">{uploadFile.name}</p>
            </div>
          )}
        </div>
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
