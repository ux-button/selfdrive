import axios from "axios";

import { useEffect, useState } from "react";
import { useCheckAuth } from "../hooks/useCheckAuth";
import { useLocation } from "react-router-dom";
import { FileIcon } from "../assets/FileIcon";
import { FolderIcon } from "../assets/FolderIcon";
import { Button } from "../components/Button";

const SharePage = () => {
  useCheckAuth();

  const [sharedData, setSharedData] = useState();
  const [sharedType, setSharedType] = useState();
  const [shareDataId, setShareDataId] = useState();

  const { pathname } = useLocation();

  useEffect(() => {
    const getFileByShareLink = async () => {
      if (pathname.startsWith("file", 8)) {
        const shareFileId = pathname.match(/(?<=share\/file\/).*/)[0];
        try {
          const { data } = await axios.get(
            `http://localhost:5123/api/files/share/${shareFileId}`,
            { withCredentials: true }
          );
          setSharedType("file");
          setShareDataId(shareFileId);
          setSharedData(data);
          console.log(data);
        } catch (err) {
          console.log(err);
        }
      }
    };

    getFileByShareLink();
  }, []);

  const handleCopyFile = async () => {
    try {
      await axios.post(
        "http://localhost:5123/api/files/copy",
        {
          fileName: sharedData.name,
          fileSize: sharedData.size,
          fileLink: sharedData.link,
        },
        { withCredentials: true }
      );
    } catch (err) {}
  };

  if (!sharedData) {
    return <>Loading...</>;
  }

  return (
    <div className="space-y-4">
      <div>
        {sharedType === "file" ? <FileIcon size="big" /> : <FolderIcon />}
      </div>
      <section>
        <h1 className="text-3xl">{sharedData.name}</h1>
        <p className="text-base text-slate-500">{sharedData.size}</p>
        <p>{sharedData.link}</p>
      </section>
      <section>
        <Button handleSubmit={handleCopyFile}>Add to foldery</Button>
      </section>
    </div>
  );
};

export { SharePage };
