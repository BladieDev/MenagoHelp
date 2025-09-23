import React, { useState } from "react";
import { useNavigate } from "react-router";

function Form() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [checkbox, setCheckbox] = useState(false);
  const [loading, isLoading] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const loginPage = () => {
    navigate("/LogIn");
  };

  const sendUsersInfo = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");
    isLoading(true);
    try {
      const response = await fetch("http://localhost:8000/api/RegisterData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          surname,
          email,
          password,
          repassword,
          checkbox,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`${errorData.error || "Unknown error"}`);
      }

      const data = await response.json();
      console.log("Success", data);

      if (data.success) {
        setMessage("Registration successful!");
      } else {
        setMessage(data.error || "Registration failed");
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
        <div className="bg bg-base-300 w-full max-w-1/3 h-full min-h-1/2  justify-items-center justify-self-center rounded-xl p-8">
          <h1 className="text text-base-content text-xl p-8">Sign In</h1>
          {message && <div className="text-center">{message}</div>}
          {loading && (
            <div className="flex justify-center my-4">
              <span className="loading loading-dots loading-lg"></span>
            </div>
          )}
          <form onSubmit={sendUsersInfo} className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-sm">Name:</span>
              </label>
              <input
                className="input input-sm  input-neutral w-full"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-sm">Surname:</span>
              </label>
              <input
                className="input input-sm input-bordered input-neutral w-full"
                type="text"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                required
              />
            </div>

            <div className="form-control">
              <label className="label label-sm">
                <span className="label-text text-sm">Email:</span>
              </label>
              <input
                className="input input-sm input-bordered input-neutral w-full"
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
                className="input  input-sm input-bordered input-neutral w-full"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-sm">Repeat the password:</span>
              </label>
              <input
                className="input input-sm input-bordered input-neutral w-full"
                type="password"
                value={repassword}
                onChange={(e) => setRepassword(e.target.value)}
                required
              />
            </div>

            <div className="form-control">
              <label className="label cursor-pointer justify-start gap-3">
                <input
                  className="checkbox checkbox-neutral"
                  type="checkbox"
                  checked={checkbox}
                  onChange={(e) => setCheckbox(e.target.checked)}
                  required
                />
                <span className="label-text">
                  Please agree to our policy to use the website{" "}
                  <a href="../policy.txt" className="link link-primary">
                    policy
                  </a>
                </span>
              </label>
            </div>

            <div className="form-control mt-8 flex items-center">
              <button
                className="btn btn-neutral btn-wide mx-auto"
                type="submit"
                disabled={loading}
              >
                Submit
              </button>
            </div>
          </form>

          <div className="text-center mt-4">
            <a
              onClick={loginPage}
              className="link link-primary link-lg cursor-pointer"
            >
              Log in
            </a>
          </div>

          <div className="bg-base-200 p-4 rounded-lg mt-4 w-full max-w-md justify-self-center">
            <h1 className="text-neutral text-center mb-3">
              Your password should have at least:
            </h1>
            <ul className="text-neutral space-y-1 text-center text-sm">
              <li>8 characters</li>
              <li>1 upper case letter</li>
              <li>3 digits</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Form;
