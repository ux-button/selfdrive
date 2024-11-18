import { useNavigate } from "react-router-dom";
import axios from "axios";

const useLogout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get("https://storageapp-krmz.onrender.com/log-out", {
        withCredentials: true,
      });
      navigate("/log-in");
    } catch (err) {}
  };

  return { handleLogout };
};

export { useLogout };
