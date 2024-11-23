import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { serverConfig } from "../serverConfig";

// TO DO here is render error while authenticate
const useCheckAuth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      // Request authentication check
      try {
        await axios.get(`${serverConfig.deploy}/auth`, {
          withCredentials: true,
        });
      } catch (err) {
        navigate("/log-in");
      }
    };

    checkAuth();
  }, []);
};

export { useCheckAuth };
