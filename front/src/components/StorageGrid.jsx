import { ItemGrid } from "./ItemGrid";

const StorageGrid = ({
  items,
  handleOpenFolder,
  handleOpenFile,
  handleDelete,
  shareModal,
}) => {
  const listItems = items.map((item) => {
    if (item.type === "folder") {
      return (
        <ItemGrid
          key={item.id}
          id={item.id}
          type="folder"
          name={item.name}
          handleClick={handleOpenFolder}
          handleDelete={handleDelete}
          handleShare={shareModal.handleOpen}
        />
      );
    } else {
      return (
        <ItemGrid
          key={item.id}
          id={item.id}
          type="file"
          name={item.name}
          size={item.size}
          link={item.link}
          handleClick={handleOpenFile}
          handleDelete={handleDelete}
          handleShare={shareModal.handleOpen}
        />
      );
    }
  });

  return (
    <section className="grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
      {listItems}
    </section>
  );
};

export { StorageGrid };
