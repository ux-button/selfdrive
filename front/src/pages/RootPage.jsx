import axios from "axios";
import { ItemGrid } from "../components/ItemGrid";
import { useContext, useEffect, useRef, useState } from "react";
import { useCheckAuth } from "../hooks/useCheckAuth";
import { useLocation, Navigate, useNavigate } from "react-router-dom";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { DataContext } from "../Context";
import { useGetFolders } from "../hooks/useGetFolders";
import { useGetFiles } from "../hooks/useGetFiles";

const RootPage = () => {
  const [state, dispatch] = useContext(DataContext);

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  // const [path, setPath] = useState(pathname);

  // Folders and files
  //const [folders, setFolders] = useState();
  //const [files, setFiles] = useState();

  const [isFolderCreated, setIsFolderCreated] = useState(false);

  // New folder input name
  const [folderName, setFolderName] = useState("");

  // File selected to upload
  const fileToUpload = useRef(null);
  const [uploadFile, setUploadFile] = useState(null);

  useCheckAuth();

  const { folders, foldersError } = useGetFolders(pathname);
  const { files, filesError } = useGetFiles(pathname);

  // useEffect(() => {
  //   setIsFolderCreated(false);
  //   console.log("Check folders");

  //   // // Get folders
  //   // const getFolders = async () => {
  //   //   try {
  //   //     const response = await axios.get(
  //   //       `http://localhost:5123/api/folders/${pathname}`,
  //   //       {
  //   //         withCredentials: true,
  //   //       }
  //   //     );
  //   //     setFolders(response.data.folders);
  //   //   } catch (err) {}
  //   // };

  //   // Get files
  //   const getFiles = async () => {
  //     try {
  //       const response = await axios.get(
  //         `http://localhost:5123/api/files/${pathname}`,
  //         {
  //           withCredentials: true,
  //         }
  //       );
  //       setFiles(response.data.files);
  //     } catch (err) {}
  //   };

  //   // getFolders();
  //   getFiles();
  // }, [isFolderCreated, pathname]);

  // Input handling
  const handleChange = (value) => {
    setFolderName(value);
  };

  // Add folder handling
  const handleSubmitFolder = () => {
    // TO DO check field
    const postFolder = async (folder) => {
      try {
        await axios.post(
          "http://localhost:5123/api/folders/",
          { folder, pathname },
          {
            withCredentials: true,
          }
        );
        setFolderName("");
        setIsFolderCreated(true);
      } catch (err) {
        console.log(err);
      }
    };

    postFolder(folderName);
  };

  // Open folder
  const handleOpenFolder = (name, e) => {
    navigate(pathname.slice(1) + "/" + name);
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
  const handleOpenFile = (name, link, e) => {
    window.location.href = link;
  };

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
      return setIsFolderCreated(true);
    } catch (err) {
      console.log("Upload error");
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
      <input
        type="file"
        ref={fileToUpload}
        className="hidden"
        onChange={handleUploadFile}
      />
      <Button handleSubmit={() => fileToUpload.current.click()}>
        Select file
      </Button>
      <Button handleSubmit={handleSendUploadFile}>Upload file</Button>
      <div className="p-8">
        <Input
          value={folderName}
          label="folder-name"
          style="default"
          placeholder="Type name"
          handleChange={handleChange}
        />
        <Button handleSubmit={handleSubmitFolder}>Add folder</Button>
      </div>
      {pathname !== "/" ? (
        <div className="pl-8" onClick={handleGoBack}>
          Back
        </div>
      ) : null}
      <div className="grid grid-cols-5">
        {folders.map((item) => {
          return (
            <ItemGrid
              key={item.id}
              type="folder"
              name={item.name}
              size="3.2 Mb"
              handleClick={handleOpenFolder}
            />
          );
        })}
      </div>
      <div className="grid grid-cols-5">
        {files.map((item) => {
          return (
            <ItemGrid
              key={item.id}
              type="file"
              name={item.name}
              size="3.2 Mb"
              link={item.link}
              handleClick={handleOpenFile}
            />
          );
        })}
      </div>
    </>
  );
};

export { RootPage };
