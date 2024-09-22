import { Input } from "../components/Input";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { ErrorMessage } from "../components/ErrorMessage";
import axios from "axios";
import { DataContext } from "../Context";
import { useCheckAuth } from "../hooks/useCheckAuth";

const SignUpPage = () => {
  const [state, dispatch] = useContext(DataContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  useCheckAuth();

  const handleUsername = (value) => {
    setUsername(value);
  };

  const handlePassword = (value) => {
    setPassword(value);
  };

  const handleSubmit = async () => {
    // TO DO field check
    setErrorMessage("");
    setIsLoading(true);
    setIsError(false);

    try {
      await axios.post("http://localhost:5123/sign-up", {
        username,
        password,
      });
      navigate("/");
    } catch (err) {
      setIsError(true);
      setIsLoading(false);
      console.log(err.response.data.error);
      return setErrorMessage(err.response.data.error);
    }
  };

  return (
    <div className="h-full w-full flex justify-center items-center p-8 space-y-4">
      <div className="flex flex-col space-y-4 p-8 bg-purple-100 rounded-3xl">
        <h1 className="text-3xl">Sign up</h1>
        {isError && <ErrorMessage error={errorMessage} />}
        <Input
          style={isError ? "error" : "default"}
          value={username}
          label="username"
          placeholder="Username"
          handleChange={handleUsername}
        />
        <Input
          style={isError ? "error" : "default"}
          value={password}
          label="password"
          placeholder="Password"
          handleChange={handlePassword}
        />
        <Button handleSubmit={handleSubmit}>Sign up</Button>
        <div>
          <p>Already have an account?</p>
          <a className="text-purple-600" href="/log-in">
            Log in
          </a>
        </div>
      </div>
    </div>
  );
};

export { SignUpPage };
