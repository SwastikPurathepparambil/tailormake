import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

export default function Landing() {

    const navigate = useNavigate();
    const { setUser } = useAuth();
    
    return (
     <>
        <GoogleLogin
            onSuccess={(credentials) => {
                // testing check 1:
                // check for whether the .credential field exists?
                const userInfo = jwtDecode(credentials.credential);

                setUser(userInfo)

                // navigate to Home Page
                navigate('/home');
            }}
            onError={() => {console.log("Log in Error")}} 
            />
     </>   
    )
}