import axios from "axios";

import { Button } from "./Button";
import { CopyIcon } from "../assets/CopyIcon";
import { useEffect, useState } from "react";
import { FolderIcon } from "../assets/FolderIcon";
import { FileIcon } from "../assets/FileIcon";

// PROBLEM load with useEffect
const ShareModal = ({ isOpen, handleClose, shareParams, handleCopy }) => {
  const [shareLink, setShareLink] = useState("Loading...");

  useEffect(() => {
    const getShareFileLink = async (id) => {
      try {
        console.log("start sending requiest");
        const result = await axios.post(
          "http://localhost:5123/api/files/share",
          {
            fileId: id,
          },
          { withCredentials: true }
        );
        console.log(result);
        setShareLink(result.data.shareLink);
      } catch (err) {
        setShareLink("Error");
      }
    };

    if (isOpen) {
      getShareFileLink(shareParams.id);
    }
    if (!isOpen) {
      setShareLink("Loading...");
    }
  }, [isOpen]);

  if (!isOpen) {
    return;
  }

  return (
    <div className="w-screen h-screen absolute top-0 left-0 flex justify-center bg-slate-500 bg-opacity-40 items-center">
      <div className="w-80 py-8 px-6 rounded-xl bg-slate-50 text-3xl space-y-4 absolute">
        <h2>Share {shareParams.type}</h2>
        <div className="flex space-x-2">
          {shareParams.type === "folder" ? <FolderIcon /> : <FileIcon />}
          <p className="text-base">{shareParams.name}</p>
        </div>
        <div className="bg-slate-100 rounded-xl flex justify-between p-4">
          <p className="text-slate-500 text-base truncate">{shareLink}</p>
          <div>
            <CopyIcon />
          </div>
        </div>
        <div className="flex space-x-2" onClick={handleClose}>
          <Button>Close</Button>
        </div>
      </div>
    </div>
  );
};

export { ShareModal };
