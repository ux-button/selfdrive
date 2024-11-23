import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverConfig } from "../serverConfig";

const useLogout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get(`${serverConfig.deploy}/log-out`, {
        withCredentials: true,
      });
      navigate("/log-in");
    } catch (err) {}
  };

  return { handleLogout };
};

export { useLogout };
