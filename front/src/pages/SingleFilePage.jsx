import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const SingleFilePage = () => {
  const [file, setFile] = useState();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const fileId = queryParams.get("fileId");

  useEffect(() => {
    const getFile = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5123/api/files/file/${fileId}`,
          { withCredentials: true }
        );
        console.log(response);
        return setFile(response);
      } catch (err) {}
    };

    getFile();
  }, []);

  if (!file) {
    return <div>Loading</div>;
  }

  return (
    <>
      <div>{file.data.id}</div>
      <div>{file.data.link}</div>
      <div>{file.data.name}</div>
      <div>{file.data.size}</div>
    </>
  );
};

export { SingleFilePage };
