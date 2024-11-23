import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { serverConfig } from "../serverConfig";

const SingleFilePage = () => {
  const [file, setFile] = useState();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const fileId = queryParams.get("fileId");

  useEffect(() => {
    const getFile = async () => {
      try {
        const response = await axios.get(
          `${serverConfig.deploy}/api/files/file/${fileId}`,
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

  console.log(file);

  console.log(file.data.link);
  console.log(file.data.id);

  return (
    <>
      {file.data.link.toLowerCase().endsWith(".png") && (
        <div className="flex justify-center p-10">
          <img className="h-[400px]" src={file.data.link} />
        </div>
      )}
      {file.data.link.toLowerCase().endsWith(".jpg") && (
        <div className="flex justify-center p-10">
          <img className="h-[400px]" src={file.data.link} />
        </div>
      )}
      {file.data.link.toLowerCase().endsWith(".jpeg") && (
        <div className="flex justify-center p-10">
          <img className="h-[400px]" src={file.data.link} />
        </div>
      )}
      <div className="flex justify-center">
        <h1 className="text-3xl">{file.data.name}</h1>
      </div>
      <div className="flex justify-center">
        <p className="text-base text-slate-500">{file.data.size}</p>
      </div>
    </>
  );
};

export { SingleFilePage };
