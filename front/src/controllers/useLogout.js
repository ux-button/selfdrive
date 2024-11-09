import { useNavigate } from "react-router-dom";
import axios from "axios";

const useLogout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:5123/log-out", {
        withCredentials: true,
      });
      navigate("/log-in");
    } catch (err) {}
  };

  return { handleLogout };
};

export { useLogout };
