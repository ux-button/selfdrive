import axios from "axios";
import { serverConfig } from "../serverConfig";

const useDelete = (toast, toastType, setToastType) => {
  const handleDelete = async (name, id, type, e) => {
    // Delete file case
    if (type === "file") {
      try {
        await axios.post(
          `${serverConfig.deploy}/api/files/delete`,
          { fileName: name, fileId: id },
          { withCredentials: true }
        );

        // Set toast view
        toast.handleOpen();
        setToastType({
          ...toastType,
          type: "success",
          message: "File deleted",
        });
      } catch (err) {
        console.log(err);
      }
    }

    // Delete folder case
    if (type === "folder") {
      try {
        await axios.post(
          `${serverConfig.deploy}/api/folders/delete`,
          { id },
          { withCredentials: true }
        );

        // Set toast view
        toast.handleOpen();
        setToastType({
          ...toastType,
          type: "success",
          message: "Folder deleted",
        });
      } catch (err) {
        console.log(err);
      }
    }
  };

  return { handleDelete };
};

export { useDelete };
