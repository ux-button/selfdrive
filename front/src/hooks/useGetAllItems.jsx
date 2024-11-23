import axios from "axios";
import { useEffect, useState } from "react";
import { serverConfig } from "../serverConfig";

const useGetAllItems = (pathname, toastType) => {
  const [items, setItems] = useState();

  useEffect(() => {
    const getAll = async () => {
      try {
        // Load all files
        const filesData = await axios.get(
          `${serverConfig.deploy}/api/files/${pathname}`,
          {
            withCredentials: true,
          }
        );
        // Load all folders
        const foldersData = await axios.get(
          `${serverConfig.deploy}/api/folders/${pathname}`,
          {
            withCredentials: true,
          }
        );
        // Merge lists
        const allItemsList = foldersData.data.folders.concat(
          filesData.data.files
        );
        // Save merged list
        setItems(allItemsList);
      } catch (err) {
        console.log("Files or folders could not be found");
      }
    };

    getAll();
  }, [pathname, toastType]);

  return { items };
};

export { useGetAllItems };
