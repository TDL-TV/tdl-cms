import { useEffect } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { Link, useNavigate } from "react-router-dom"
import '../../assets/css/Login.css'
import { auth, signInWithGoogle } from "../../firebase/FirebaseConfig"



const Register = () => {
    const [user, loading, error] = useAuthState(auth)
    const navigate = useNavigate() 

    useEffect(() => {
        if (loading) return
        if (user) navigate("/dashboard")
    }, [user, loading])
  return (
    <div className="register_container">
        <button onClick={signInWithGoogle}>Register with google</button>
        <div>
       Already redgistered?  <Link to="/">Log in</Link>
      </div>
    </div>

  )
}

export default Register