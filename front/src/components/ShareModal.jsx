import axios from "axios";

import { Button } from "./Button";
import { CopyIcon } from "../assets/CopyIcon";
import { useEffect, useState } from "react";
import { FolderIcon } from "../assets/FolderIcon";
import { FileIcon } from "../assets/FileIcon";

// TO DO optimise load with useEffect
const ShareModal = ({
  isOpen,
  handleClose,
  shareParams,
  toast,
  toastType,
  setToastType,
}) => {
  const [shareLink, setShareLink] = useState("Loading...");

  useEffect(() => {
    const getShareFileLink = async (id) => {
      try {
        const result = await axios.post(
          "https://storageapp-krmz.onrender.com/api/files/share",
          {
            fileId: id,
          },
          { withCredentials: true }
        );
        setShareLink(result.data.shareLink);
      } catch (err) {
        setShareLink("Error");
      }
    };

    // When opening
    if (isOpen) {
      getShareFileLink(shareParams.id);
    }
    // When closing
    if (!isOpen) {
      setShareLink("Loading...");
    }
  }, [isOpen]);

  const handleCopy = () => {
    navigator.clipboard
      .writeText(shareLink)
      .then(() => {
        toast.handleOpen();
        setToastType({
          ...toastType,
          type: "success",
          message: "Link copied",
        });
      })
      .catch(() => console.log("Something went wrong"));
  };

  if (!isOpen) {
    return;
  }

  return (
    <div className="w-screen h-screen absolute top-0 left-0 flex justify-center bg-slate-500 bg-opacity-40 items-center">
      <div className="w-80 py-8 px-6 rounded-xl bg-slate-50 text-3xl space-y-4 absolute">
        <h2>Share {shareParams.type}</h2>
        <section className="flex space-x-2">
          <div>
            {shareParams.type === "folder" ? <FolderIcon /> : <FileIcon />}
          </div>
          <p className="text-base">{shareParams.name}</p>
        </section>
        <section className="bg-slate-100 rounded-xl flex justify-between p-4">
          <p className="text-slate-500 text-base truncate">{shareLink}</p>
          <div onClick={handleCopy}>
            <CopyIcon />
          </div>
        </section>
        <section className="flex space-x-2" onClick={handleClose}>
          <Button>Close</Button>
        </section>
      </div>
    </div>
  );
};

export { ShareModal };
