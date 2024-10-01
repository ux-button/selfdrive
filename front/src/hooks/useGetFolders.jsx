import axios from "axios";
import { useEffect, useState } from "react";

const useGetFolders = (pathname) => {
  const [folders, setFolders] = useState();
  const [error, setError] = useState("");

  useEffect(() => {
    const getFolders = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5123/api/folders/${pathname}`,
          {
            withCredentials: true,
          }
        );
        console.log("folders loaded", response);
        return setFolders(response.data.folders);
      } catch (err) {
        return setError("Folders could not be found");
      }
    };

    getFolders();
  }, [pathname]);

  return { folders, foldersError: error };
};

export { useGetFolders };