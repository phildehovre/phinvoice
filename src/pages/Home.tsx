import { useNavigate } from "react-router-dom";
import Login from "../components/Login";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import { useEffect } from "react";

function Home() {
  const navigate = useNavigate();
  const auth = getAuth();
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user]);

  return (
    <div>
      <Login />
    </div>
  );
}

export default Home;
