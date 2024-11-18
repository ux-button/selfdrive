import { useState } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import axios from "axios";

const NewFolderPage = () => {
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [folderName, setFolderName] = useState("");
  const handleChange = (value) => {
    setFolderName(value);
  };
  const handleSubmit = () => {
    // TO DO check field
    const postFolder = async (folder) => {
      try {
        await axios.post(
          "https://storageapp-krmz.onrender.com/api/folders/",
          { folder },
          {
            withCredentials: true,
          }
        );
      } catch (err) {
        console.log(err);
      }
    };
    postFolder(folderName);
  };

  return (
    <div className="p-8">
      <Input
        value={folderName}
        label="folder-name"
        style="default"
        placeholder="Type name"
        handleChange={handleChange}
      />
      <Button handleSubmit={handleSubmit}>Add folder</Button>
    </div>
  );
};

export { NewFolderPage };
