import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

export default function Landing() {

    const navigate = useNavigate();
    
    return (
     <>
        <GoogleLogin
            onSuccess={(credentials) => {
                console.log(credentials);
                // check for whether the .credential field exists?
                console.log(jwtDecode(credentials.credential));

                // navigate to Home Page
                navigate('/home');
            }}
            onError={() => {console.log("Log in Error")}} 
            />
     </>   
    )
}