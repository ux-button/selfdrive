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

const RootPage = () => {
  const [state, dispatch] = useContext(DataContext);

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [isFolderCreated, setIsFolderCreated] = useState(false);

  useCheckAuth();

  const { folders, foldersError } = useGetFolders(pathname);
  const { files, filesError } = useGetFiles(pathname);

  // Modal new folder
  const [isModalNewFolderOpen, setIsModalNewFolderOpen] = useState(false);
  const handleOpenModalNewFolder = () => {
    setIsModalNewFolderOpen(true);
  };
  const handleCloseModalNewFolder = (isCreated) => {
    // TO DO: add change state to folder and file loader
    isCreated && setIsFolderCreated(true);
    setIsModalNewFolderOpen(false);
  };

  // Modal upload file
  const [isModalUploadFileOpen, setIsModalUploadFileOpen] = useState(false);
  const handleOpenModalUploadFile = () => {
    setIsModalUploadFileOpen(true);
  };
  const handleCloseModalUploadFile = (isCreated) => {
    // TO DO: add change state to folder and file loader
    setIsModalUploadFileOpen(false);
  };

  // Modal share
  const [isModalShareOpen, setIsModalShareOpen] = useState(false);
  const [shareParams, setShareParams] = useState();
  const handleOpenModalShare = (name, id, type, e) => {
    setShareParams({ name, id, type, e });
    setIsModalShareOpen(true);
  };
  const handleCloseModalShare = () => {
    setIsModalShareOpen(false);
  };

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

  // Handle delete file or folder
  // TO DO Separate files and folders component
  const handleDelete = async (name, id, type, e) => {
    // Delete file case
    if (type === "file") {
      try {
        await axios.post(
          "http://localhost:5123/api/files/delete",
          { fileName: name, fileId: id },
          { withCredentials: true }
        );
      } catch (err) {
        console.log(err);
      }
    }

    // Delete folder case
    if (type === "folder") {
      try {
        const response = await axios.post(
          "http://localhost:5123/api/folders/delete",
          { id },
          { withCredentials: true }
        );
      } catch (err) {
        console.log(err);
      }
    }
  };

  if (!state.isAuthenticated) {
    return <Navigate to="/log-in" />;
  }

  if (!folders || !files) {
    return <div>Loading</div>;
  }

  return (
    <>
      <NewFolderModal
        isOpen={isModalNewFolderOpen}
        handleClose={handleCloseModalNewFolder}
      />
      <UploadFileModal
        isOpen={isModalUploadFileOpen}
        handleClose={handleCloseModalUploadFile}
      />
      <ShareModal
        isOpen={isModalShareOpen}
        handleClose={handleCloseModalShare}
        shareParams={shareParams}
      />
      <div className="flex p-8 space-x-4 justify-between">
        <div className="text-purple-400 cursor-pointer">
          {pathname !== "/" && <div onClick={handleGoBack}>Back</div>}
        </div>
        <div className="flex space-x-4">
          <Button type="shadow" handleSubmit={handleOpenModalNewFolder}>
            Add folder
          </Button>
          <Button type="shadow" handleSubmit={handleOpenModalUploadFile}>
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
              handleShare={handleOpenModalShare}
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
              handleShare={handleOpenModalShare}
            />
          );
        })}
      </div>
    </>
  );
};

export { RootPage };
