import "../../assets/css/Login.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { auth, signInWithGoogle } from "../../firebase/FirebaseConfig";

const Login = () => {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;

    if (user) navigate("/dashboard");
  }, [user, loading]);

  return (
    <div className="login__container">
      <button className="login__btn login__google" onClick={signInWithGoogle}>
        Login with Google
      </button>
      <div>
        Dont have an a count? <Link to="/register">Register</Link>
      </div>
    </div>
  );
};

export default Login;
