import { provider } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithPopup } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import "./Login.scss";

const Login = () => {
  const auth = getAuth();
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const handleSignInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (err) {
      alert(err);
    } finally {
      navigate("/dashboard");
    }
  };

  const handleSignOut = async () => {
    try {
      await auth.signOut();
    } catch (err) {
      alert(err);
    } finally {
      navigate("/");
    }
  };

  return (
    <>
      {user ? (
        <button className="login-btn" onClick={handleSignOut}>
          Sign out
        </button>
      ) : (
        <button className="login-btn" onClick={handleSignInWithGoogle}>
          <span style={{ padding: "0 .5em" }}>Sign in with Google</span>
        </button>
      )}
    </>
  );
};

export default Login;
