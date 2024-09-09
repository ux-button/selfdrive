import { FileIcon } from "../assets/FileIcon";
import { FolderIcon } from "../assets/FolderIcon";

const ItemGrid = ({ type, name, size }) => {
  const iconType = {
    folder: <FolderIcon size="big" />,
    file: <FileIcon size="big" />,
  };
  return (
    <div className="p-4">
      <div className="flex justify-center">{iconType[type]}</div>
      <p className="w-fill text-center line-clamp-2">{name}</p>
      <p className="w-fill text-center text-sm text-zinc-500">{size}</p>
    </div>
  );
};

export { ItemGrid };
