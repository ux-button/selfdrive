import axios from "axios";
import { DataContext } from "../Context";
import { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const useCheckAuth = () => {
  const [state, dispatch] = useContext(DataContext);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsAuthenticated(false);
    setIsError(false);

    const checkAuth = async () => {
      // Check reducer state
      if (state.isAuthenticated) {
        return setIsAuthenticated(true);
      }

      // Request authentication check
      try {
        const response = await axios.get("http://localhost:5123/auth", {
          withCredentials: true,
        });

        // Save state to reducer
        if (response.data.isAuthenticated) {
          dispatch({
            type: "authorize",
            payload: {
              isAuthenticated: true,
              user: response.data.user.id,
              username: response.data.user.username,
            },
          });
        }
        setIsAuthenticated(true);
      } catch (err) {
        setIsAuthenticated(false);
        setIsError(true);
      }
    };

    checkAuth();
  }, []);

  return { isAuthenticated, isError };
};

export { useCheckAuth };
