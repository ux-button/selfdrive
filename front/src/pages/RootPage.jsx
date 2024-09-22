import axios from "axios";
import { ItemGrid } from "../components/ItemGrid";
import { useEffect, useRef, useState } from "react";
import { useCheckAuth } from "../hooks/useCheckAuth";
import { useLocation, Navigate, useNavigate } from "react-router-dom";
import { Input } from "../components/Input";
import { Button } from "../components/Button";

const RootPage = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const fileToUpload = useRef(null);

  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  // const [path, setPath] = useState(pathname);
  const [folders, setFolders] = useState();
  const [isFolderCreated, setIsFolderCreated] = useState(false);

  // Folder
  const [folderName, setFolderName] = useState("");

  // File upload
  const [uploadFile, setUploadFile] = useState(null);

  useCheckAuth();

  useEffect(() => {
    setIsFolderCreated(false);
    console.log("Check folders");
    const getFolders = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5123/api/folders/${pathname}`,
          {
            withCredentials: true,
          }
        );
        setFolders(response.data.folders);
      } catch (err) {}
    };
    getFolders();
  }, [isFolderCreated, pathname]);

  const handleChange = (value) => {
    setFolderName(value);
  };
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

  const handleGoBack = () => {
    if (pathname !== "/") {
      let pathSegments = pathname.split("/");
      pathSegments = pathSegments.slice(0, pathSegments.length - 1);
      const backPath = pathSegments.join("/");
      navigate(backPath);
    }
  };

  const handleUploadFile = (event) => {
    setUploadFile(event.target.files[0]);
  };

  // Uploading files logic
  const handleSendUploadFile = async () => {
    const formData = new FormData();
    formData.append("file", uploadFile);

    if (!uploadFile) {
      return console.log("No file");
    }

    try {
      const response = await axios.post(
        "http://localhost:5123/api/upload",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } },
        { withCredentials: true }
      );
    } catch (err) {
      console.log("Upload error");
    }
  };

  if (!folders) {
    //return <div>Loading</div>;
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
      {/* <div className="grid grid-cols-5">
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
      </div> */}
    </>
  );
};

export { RootPage };
