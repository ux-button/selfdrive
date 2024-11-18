import { useState } from "react";
import { useCheckAuth } from "../hooks/useCheckAuth";
import { useLocation, Navigate, useNavigate, Link } from "react-router-dom";
import { Button } from "../components/Button";
import { NewFolderModal } from "../components/NewFolderModal";
import { UploadFileModal } from "../components/UploadFileModal";
import { ShareModal } from "../components/ShareModal";
import { Toast } from "../components/Toast";

import { useShareModal } from "../controllers/useShareModal";
import { useNewFolderModal } from "../controllers/useNewFolderModal";
import { useUploadModal } from "../controllers/useUploadModal";
import { useDelete } from "../controllers/useDelete";
import { useToast } from "../controllers/useToast";
import { useLogout } from "../controllers/useLogout";
import { StorageGrid } from "../components/StorageGrid";
import { useGetAllItems } from "../hooks/useGetAllItems";

const RootPage = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // Toast type and text
  const [toastType, setToastType] = useState({ type: "", message: "" });

  // Check authenticated hook
  useCheckAuth();

  // Files and folders hook
  const { items } = useGetAllItems(pathname, toastType);

  // Toast hooks
  const toast = useToast(toastType, setToastType);

  // Modal hooks
  const shareModal = useShareModal(toast, toastType, setToastType);
  const newFolderModal = useNewFolderModal(toast, toastType, setToastType);
  const uploadModal = useUploadModal(toast, toastType, setToastType);

  // Controller hooks
  const { handleDelete } = useDelete(toast, toastType, setToastType);
  const { handleLogout } = useLogout();

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

  if (!items) {
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
        toast={toast}
        toastType={toastType}
        setToastType={setToastType}
      />
      <div className="flex p-8 space-x-4 justify-between">
        <div className="text-purple-800 cursor-pointer">
          {pathname !== "/" && <div onClick={handleGoBack}>Back</div>}
        </div>
        <div className="flex space-x-4">
          <Button type="shadow" handleSubmit={newFolderModal.hanldeOpen}>
            Add folder
          </Button>
          <Button type="shadow" handleSubmit={uploadModal.handleOpen}>
            Upload file
          </Button>
          <div
            className="flex flex-col justify-center text-purple-800  cursor-pointer"
            onClick={handleLogout}
          >
            Logout
          </div>
        </div>
      </div>
      <div>
        <StorageGrid
          items={items}
          handleOpenFolder={handleOpenFolder}
          handleOpenFile={handleOpenFile}
          handleDelete={handleDelete}
          shareModal={shareModal}
        />
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
