import axios from "axios";
import { useEffect, useState } from "react";

const useGetFiles = (pathname) => {
  const [files, setFiles] = useState();
  const [error, setError] = useState("");

  useEffect(() => {
    const getFiles = async () => {
      try {
        const response = await axios.get(
          `https://storageapp-krmz.onrender.com/api/files/${pathname}`,
          {
            withCredentials: true,
          }
        );
        console.log("files loaded", response);
        return setFiles(response.data.files);
      } catch (err) {
        return setError("Files could not be found");
      }
    };

    getFiles();
  }, [pathname]);

  return { files, filesError: error };
};

export { useGetFiles };
