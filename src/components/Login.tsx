import React from 'react';
// import { useAuthState, useSendEmailVerification } from 'react-firebase-hooks/auth';
import { provider } from '../config/firebase';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithPopup } from 'firebase/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMailBulk } from '@fortawesome/free-solid-svg-icons';

const Login = () => {


  const auth = getAuth()
  const navigate = useNavigate()

  const handleSignInWithGoogle = async () => {
    try {
      const res = await signInWithPopup(auth, provider)

    }
    catch (err) {
      alert(err)
    }

    finally {
      navigate('/dashboard')
    }
  };

const handleSignOut = async () => {
  try {
    const res = await auth.signOut()
  }
  catch (err) {
    alert(err)
  }
  finally {
    navigate('/')
  }
}

  console.log(auth.currentUser? true: false)

  return (
    <>
      <button onClick={handleSignInWithGoogle}>
        {/* <FontAwesomeIcon icon={faMailBulk} /> */}
        <span style={{ padding: '0 .5em' }}>
          Sign in with Google
        </span>
      </button>
      <button onClick={handleSignOut}>
        Sign out
      </button>
    </>


  );
};

export default Login;
