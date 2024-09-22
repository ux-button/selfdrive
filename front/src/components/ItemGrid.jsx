import { FileIcon } from "../assets/FileIcon";
import { FolderIcon } from "../assets/FolderIcon";

const ItemGrid = ({ type, name, size, handleClick }) => {
  const iconType = {
    folder: <FolderIcon size="big" />,
    file: <FileIcon size="big" />,
  };
  return (
    <div
      className="p-4 hover:bg-purple-50 hover:rounded-xl cursor-pointer"
      onDoubleClick={(e) => handleClick(name, e)}
    >
      <div className="flex justify-center">{iconType[type]}</div>
      <p className="w-fill text-center line-clamp-2 select-none">{name}</p>
      <p className="w-fill text-center text-sm text-zinc-500 select-none">
        {size}
      </p>
    </div>
  );
};

export { ItemGrid };
