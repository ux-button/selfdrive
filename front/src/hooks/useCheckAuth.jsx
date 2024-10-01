import axios from "axios";
import { DataContext } from "../Context";
import { useContext, useEffect, useState } from "react";

// TO DO here is render error while authenticate
const useCheckAuth = () => {
  const [state, dispatch] = useContext(DataContext);

  useEffect(() => {
    if (state.isAuthenticated) {
      console.log("Short circle");
    }

    const checkAuth = async () => {
      // Request authentication check
      console.log("Long circle");
      try {
        const response = await axios.get("http://localhost:5123/auth", {
          withCredentials: true,
        });

        // Authenticate in reducer
        dispatch({
          type: "authorize",
          payload: {
            isAuthenticated: true,
            user: response.data.user.id,
            username: response.data.user.username,
          },
        });
      } catch (err) {
        // Log-out in reducer
        dispatch({
          type: "unauthorize",
        });
      }
    };

    checkAuth();
  }, []);
};

export { useCheckAuth };
