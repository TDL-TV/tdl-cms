import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import "../../assets/css/Login.css";
import { auth, signInWithGoogle } from "../../firebase/FirebaseConfig";

const Register = () => {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (user) navigate("/dashboard/news and events");
  }, [user, loading]);
  return (
    <div className="login__container">
      <h1>
        Welcome to TDL TV Content Management Site.
      </h1>
      <div className="logindiv">
      <button onClick={signInWithGoogle}>Register with google</button>
      <div>
        Already redgistered? <Link to="/">Login</Link>
      </div>

      </div>
    </div>
  );
};

export default Register;
