import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// TO DO here is render error while authenticate
const useCheckAuth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      // Request authentication check
      console.log("Long circle");
      try {
        await axios.get("http://localhost:5123/auth", {
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
