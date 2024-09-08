import { Input } from "../components/Input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { ErrorMessage } from "../components/ErrorMessage";

const SignUpPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleUsername = (value) => {
    setUsername(value);
  };

  const handlePassword = (value) => {
    setPassword(value);
  };

  const handleSubmit = () => {};

  return (
    <div className="h-full w-full flex justify-center items-center p-8 space-y-4">
      <div className="flex flex-col space-y-4 p-8 bg-purple-100 rounded-3xl">
        <h1 className="text-3xl">Log in</h1>
        {isError && <ErrorMessage text={errorMessage} />}
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
          <a className="text-purple-600" href="/signup">
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
};

export { SignUpPage };
