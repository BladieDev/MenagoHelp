import Form from "./components/SignInForm";
import { useNavigate } from "react-router";

function SignIn() {
  return (
    <div data-theme="theme">
      <div className="min-h-screen bg-base-100 flex flex-col items-center justify-center border">
        <div className="w-full h-full ">
          <Form />
        </div>
      </div>
    </div>
  );
}

export default SignIn;
