import LoginForm from "./components/LogInForm";
import React from "react";
import "../app.css";

function Login() {
  return (
    <>
      <div
        data-theme="theme"
        className="min-h-screen bg-base-100 flex flex-col items-center justify-center border"
      >
        <div className="w-full h-full ">
          <LoginForm />
        </div>
      </div>
    </>
  );
}
export default Login;
