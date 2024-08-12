/* eslint-disable no-unused-vars */
import googleLogo from "../assets/google-logo-png.png";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../configs/firebaseConfig";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      navigate("/");
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  return (
    <div className="w-full h-dvh sm:h-screen flex justify-center items-center">
      <div className="flex flex-col w-full md:w-[35%] justify-center items-center space-y-5">
        <h1 className="text-xl font-medium">Welcome To Tree-book 🌲🌲🌲</h1>
        <button
          onClick={handleSignIn}
          className="p-3 w-[55%] border flex gap-5 items-center border-zinc-400 rounded-lg bg-blue-600 text-white font-normal"
        >
          <img src={googleLogo} className="w-8 h-8" alt="Google Logo" />
          Sign In with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
