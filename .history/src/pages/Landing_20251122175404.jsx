import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

export default function SignInPage() {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleGoogleSuccess = (credentials) => {
    try {
      const userInfo = jwtDecode(credentials.credential);
      setUser(userInfo);
      navigate("/home");
    } catch (err) {
      console.error("Google login failed:", err);
    }
  };

  const handleGoogleError = () => {
    console.error("Google Login Error");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white shadow-lg rounded-xl p-10 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold mb-4">Welcome to TailorMake</h1>
        <p className="text-gray-600 mb-8">
          Sign in or create an account to continue.
        </p>

        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            auto_select={false}
          />
        </div>

        <p className="mt-6 text-sm text-gray-500">
          By signing in, you agree to our Terms and Privacy Policy.
        </p>
      </div>
    </div>
  );
}
