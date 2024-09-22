import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { ErrorMessage } from "../components/ErrorMessage";
import { DataContext } from "../Context";
import { useCheckAuth } from "../hooks/useCheckAuth";

const LogInPage = () => {
  const [state, dispatch] = useContext(DataContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useCheckAuth();

  const handleUsername = (value) => {
    setUsername(value);
  };

  const handlePassword = (value) => {
    setPassword(value);
  };

  const handleSubmit = async () => {
    try {
      await axios.post(
        "http://localhost:5123/log-in",
        { username, password },
        {
          withCredentials: true,
        }
      );
      navigate("/");
    } catch (err) {
      setIsError(true);
      setIsLoading(false);
      console.log(err.response.data.error);
      return setErrorMessage(err.response.data.error);
    }
  };

  if (state.isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="h-full w-full flex justify-center items-center p-8 space-y-4">
      <div className="flex flex-col space-y-4 p-8 bg-purple-100 rounded-3xl">
        <h1 className="text-3xl">Log in</h1>
        {isError && <ErrorMessage error={errorMessage} />}
        <Input
          style="default"
          value={username}
          label="username"
          placeholder="Username"
          handleChange={handleUsername}
        />
        <Input
          style="default"
          value={password}
          label="password"
          placeholder="Password"
          handleChange={handlePassword}
        />
        <Button handleSubmit={handleSubmit}>Log in</Button>
        <div>
          <p>Do not have account?</p>
          <a className="text-purple-600" href="/sign-up">
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
};

export { LogInPage };
