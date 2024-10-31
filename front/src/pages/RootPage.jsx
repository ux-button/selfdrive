import axios from "axios";
import { ItemGrid } from "../components/ItemGrid";
import { useContext, useEffect, useRef, useState } from "react";
import { useCheckAuth } from "../hooks/useCheckAuth";
import { useLocation, Navigate, useNavigate, Link } from "react-router-dom";
import { Button } from "../components/Button";
import { DataContext } from "../Context";
import { useGetFolders } from "../hooks/useGetFolders";
import { useGetFiles } from "../hooks/useGetFiles";
import { NewFolderModal } from "../components/NewFolderModal";
import { UploadFileModal } from "../components/UploadFileModal";
import { ShareModal } from "../components/ShareModal";
import { Toast } from "../components/Toast";
import { TickIcon } from "../assets/TickIcon";

import { useShareModal } from "../controllers/useShareModal";
import { useNewFolderModal } from "../controllers/useNewFolderModal";
import { useUploadModal } from "../controllers/useUploadModal";
import { useDelete } from "../controllers/useDelete";
import { useToast } from "../controllers/useToast";

const RootPage = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [state, dispatch] = useContext(DataContext);

  // Toast type and text
  const [toastType, setToastType] = useState({ type: "", message: "" });

  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Check authenticated hook
  useCheckAuth();

  // Files and folders hook
  const { folders, foldersError } = useGetFolders(pathname);
  const { files, filesError } = useGetFiles(pathname);

  // Toast hooks
  const toast = useToast(toastType, setToastType);

  // Modal hooks
  const shareModal = useShareModal();
  const newFolderModal = useNewFolderModal(toast, toastType, setToastType);
  const uploadModal = useUploadModal(toast, toastType, setToastType);

  // Controller hooks
  const { handleDelete } = useDelete();

  // Handle go back click
  const handleGoBack = () => {
    if (pathname !== "/") {
      let pathSegments = pathname.split("/");
      pathSegments = pathSegments.slice(0, pathSegments.length - 1);
      const backPath = pathSegments.join("/");
      navigate(backPath);
    }
  };

  // Open file
  const handleOpenFile = (name, link, fileId, e) => {
    navigate(pathname.slice(1) + `?fileId=${fileId}`);
  };

  // Open folder
  const handleOpenFolder = (name, e) => {
    navigate(pathname.slice(1) + "/" + name);
  };

  // if (!state.isAuthenticated) {
  //   return <Navigate to="/log-in" />;
  // }

  if (!folders || !files) {
    return <div>Loading</div>;
  }

  return (
    <>
      <NewFolderModal
        isOpen={newFolderModal.isOpen}
        handleClose={newFolderModal.handleClose}
      />
      <UploadFileModal
        isOpen={uploadModal.isOpen}
        handleClose={uploadModal.hanldeClose}
        handleUploadFile={uploadModal.handleUploadFile}
        handleSendUploadFile={uploadModal.handleSendUploadFile}
        handleRelease={uploadModal.handleRelease}
        uploadFile={uploadModal.uploadFile}
      />
      <ShareModal
        isOpen={shareModal.isOpen}
        handleClose={shareModal.handleClose}
        shareParams={shareModal.params}
      />
      <div className="flex p-8 space-x-4 justify-between">
        <div className="text-purple-400 cursor-pointer">
          {pathname !== "/" && <div onClick={handleGoBack}>Back</div>}
        </div>
        <div className="flex space-x-4">
          <Button type="shadow" handleSubmit={newFolderModal.hanldeOpen}>
            Add folder
          </Button>
          <Button type="shadow" handleSubmit={uploadModal.handleOpen}>
            Upload file
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-5">
        {folders.map((item) => {
          return (
            <ItemGrid
              key={item.id}
              id={item.id}
              type="folder"
              name={item.name}
              size="3.2 Mb"
              handleClick={handleOpenFolder}
              handleDelete={handleDelete}
              handleShare={shareModal.handleOpen}
            />
          );
        })}
      </div>
      <div className="grid grid-cols-5">
        {files.map((item) => {
          return (
            <ItemGrid
              key={item.id}
              id={item.id}
              type="file"
              name={item.name}
              size="3.2 Mb"
              link={item.link}
              handleClick={handleOpenFile}
              handleDelete={handleDelete}
              handleShare={shareModal.handleOpen}
            />
          );
        })}
      </div>
      <Toast
        type={toastType.type}
        isVisible={toast.isOpen}
        handleClose={toast.hanldeClose}
      >
        {toastType.message}
      </Toast>
    </>
  );
};

export { RootPage };
