import React from 'react';

import { Button, Container } from "react-bootstrap"


import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

function Login({ auth }) {
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    console.log({ provider })
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  return (
    <Container className='d-flex flex-column m-auto justify-content-center align-items-center' style={{ height: '400px' }}>
      <h2>Login to Enter the in Task Manager</h2>
      <Button onClick={signInWithGoogle}>Sign in with Google</Button>
    </Container>
  );
}

export default Login;
