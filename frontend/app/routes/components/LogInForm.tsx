import React, { useState } from "react";
import "../../app.css";
import { useNavigate } from "react-router";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState();
  const [message, setMessage] = useState("");
  const [loading, isLoading] = useState(false);
  const navigate = useNavigate();
  const SignInPage = () => {
    navigate("/SignIn");
  };

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");
    isLoading(true);
    try {
      const response = await fetch("http://localhost:8000/api/LoginData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`${errorData.error || "unknown error"}`);
      }
      const data = await response.json();
      console.log("Success", data);
      if (data.logged) {
        setMessage("Log in successful");
      } else {
        setMessage(`${data.error}`);
      }
    } catch (error) {
      let errorMsg = "Unknown Error";
      if (error && typeof error === "object" && "message" in error) {
        errorMsg = (error as any).message;
      }
      setMessage(`${errorMsg}`);
    } finally {
      isLoading(false);
    }
  };
  return (
    <>
      <div data-theme="theme">
        <div className="bg bg-base-300 w-full max-w-1/3 h-full min-h-1/2 justify-items-center justify-self-center rounded-xl p-8">
          {}
          <h1 className="text text-base-content text-xl p-8">Log In</h1>
          {message && <div className="text text-center">{message}</div>}
          {loading && (
            <div className="flex justify-center my-4">
              <span className="loading loading-dots loading-lg"></span>
            </div>
          )}
          <form onSubmit={handleLogin} className="space-y-8">
            <div className="form-control">
              <label className="label">
                <span className="label-text tex-sm">email:</span>
              </label>
              <input
                className="input input-bordered input-sm input-neutral w-full"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-sm">Password:</span>
              </label>
              <input
                className="input input-sm input-bordered input-neutral w-full"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-control">
              <button
                className="btn btn-neutral btn-wide"
                type="submit"
                disabled={loading}
              >
                Submit
              </button>
            </div>
          </form>
          <div className="text text-center mt-4">
            <a
              className="link link-primary link-lg cursor-pointer"
              onClick={SignInPage}
            >
              Sign in
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginForm;
