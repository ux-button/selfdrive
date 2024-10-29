import axios from "axios";

const useDelete = () => {
  const handleDelete = async (name, id, type, e) => {
    // Delete file case
    if (type === "file") {
      try {
        await axios.post(
          "http://localhost:5123/api/files/delete",
          { fileName: name, fileId: id },
          { withCredentials: true }
        );
      } catch (err) {
        console.log(err);
      }
    }

    // Delete folder case
    if (type === "folder") {
      try {
        const response = await axios.post(
          "http://localhost:5123/api/folders/delete",
          { id },
          { withCredentials: true }
        );
      } catch (err) {
        console.log(err);
      }
    }
  };

  return { handleDelete };
};

export { useDelete };
