import axios from "axios";

import { useState } from "react";
import { Button } from "./Button";
import { Input } from "./Input";
import { useLocation } from "react-router-dom";

import { serverConfig } from "../serverConfig";

const NewFolderModal = ({ isOpen, handleClose }) => {
  const [folderName, setFolderName] = useState("");

  // Pathname
  const { pathname } = useLocation();

  // Input handling
  const handleChange = (value) => {
    setFolderName(value);
  };

  // Add folder handling
  const handleSubmitFolder = () => {
    console.log("Work");
    // TO DO check field
    const postFolder = async (folder) => {
      try {
        await axios.post(
          `${serverConfig.deploy}/api/folders/`,
          { folder, pathname },
          {
            withCredentials: true,
          }
        );
        setFolderName("");
        handleClose(true);
      } catch (err) {
        console.log(err);
      }
    };

    postFolder(folderName);
  };

  if (!isOpen) {
    return;
  }

  return (
    <div className="w-screen h-screen absolute top-0 left-0 flex justify-center bg-slate-500 bg-opacity-40 items-center">
      <div className="w-80 py-8 px-6 rounded-xl bg-slate-50 text-3xl space-y-4 absolute">
        <h2>Create new folder</h2>
        <Input
          label="Name"
          style="default"
          placeholder="Type folder name"
          handleChange={handleChange}
        />
        <div className="flex space-x-2">
          <Button handleSubmit={handleSubmitFolder}>Add folder</Button>
          <Button handleSubmit={() => handleClose(false)}>Cancel</Button>
        </div>
      </div>
    </div>
  );
};

export { NewFolderModal };
