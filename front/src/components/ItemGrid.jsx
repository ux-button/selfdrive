import { FileIcon } from "../assets/FileIcon";
import { FolderIcon } from "../assets/FolderIcon";
import { TrashIcon } from "../assets/TrashIcon";
import { ShareIcon } from "../assets/ShareIcon";

const ItemGrid = ({
  id,
  type,
  name,
  size,
  link,
  handleClick,
  handleDelete,
  handleShare,
}) => {
  const iconType = {
    folder: <FolderIcon size="big" />,
    file: <FileIcon size="big" />,
  };
  return (
    <div
      className="p-4 hover:bg-purple-50 hover:rounded-xl cursor-pointer"
      onDoubleClick={(e) => handleClick(name, link, id, e)}
    >
      <div className="flex justify-center">{iconType[type]}</div>
      <p className="w-fill text-center line-clamp-2 select-none">{name}</p>
      <p className="w-fill text-center text-sm text-zinc-500 select-none">
        {size}
      </p>
      <section className="pt-2 flex justify-center space-x-2">
        <div
          onClick={(e) => handleDelete(name, id, type, e)}
          className="flex justify-center"
        >
          <TrashIcon />
        </div>
        <div onClick={(e) => handleShare(name, id, type, e)}>
          <ShareIcon />
        </div>
      </section>
    </div>
  );
};

export { ItemGrid };
