import React, { useEffect, useState } from 'react'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase.js'
import { useNavigate } from 'react-router-dom'

export default function Welcome() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isError, setIsError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [isRegistering, setIsRegistering] = useState(false)
  const [registerInformations, setRegisterInformations] = useState({
    email: '',
    confirmEmail: '',
    password: '',
    confirmPassword: ''
  })

  const navigate = useNavigate()

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        navigate('/homepage')
      }
    })
  }, [])


  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }
  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }
  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password).then(() => {
      navigate('/homepage')
    })
      .catch(err => {
        console.log(err.code)
        // Handle Errors here.
        setIsError(true)
        if (err.code === 'auth/invalid-email') {
          setErrorMessage('Invalid email.');
        } else if (err.code === 'auth/wrong-password') {
          setErrorMessage('Wrong password.');
        } else if (err.code === 'auth/internal-error') {
          setErrorMessage('Internal error.');
        } else if (err.code === 'auth/user-not-found') {
          setErrorMessage('User not found.');
        } else if (err.code === 'auth/too-many-requests') {
          setErrorMessage('Too many requests.');
        } else {
          setErrorMessage(err.code);
        }
      })
  }
  const handleRegister = () => {
    if (registerInformations.email !== registerInformations.confirmEmail) {
      setIsError(true)
      setErrorMessage('Please make sure your email match.');
      return
    }
    if (registerInformations.password !== registerInformations.confirmPassword) {
      setIsError(true)
      setErrorMessage('Please make sure your password match.');
      return
    }
    createUserWithEmailAndPassword(auth, registerInformations.email, registerInformations.password)
      .then(() => {
        navigate('/homepage')
      })
      .catch(err => {
        console.log(err.message)
        // Handle Errors here.
        setIsError(true)
        if (err.code === 'auth/invalid-email') {
          setErrorMessage('Invalid email.');
        } else if (err.code === 'auth/weak-password') {
          setErrorMessage('Password should be at least 6 characters.');
        } else if (err.code === 'auth/internal-error') {
          setErrorMessage('internal error.');
        } else if (err.code === 'auth/too-many-requests') {
          setErrorMessage('Too many requests.');
        } else {
          setErrorMessage(err.code);
        }
      })
  }

  return (
    <div className='w-[40%] sm:w-[90%] md:w-[60%] mx-auto'>
      <h1 className='text-4xl p-4 font-bold'>Todo List</h1>
      <div>
        {
          isRegistering ?
            <div className='flex flex-col'>
              <input
                className='outline-none m-2 rounded-md py-1 px-3 border-2 border-black'
                type="email"
                onChange={(e) => setRegisterInformations({ ...registerInformations, email: e.target.value })}
                value={registerInformations.email}
                placeholder='Email'
              />
              <input
                className='outline-none m-2 rounded-md py-1 px-3 border-2 border-black'
                type="email"
                onChange={(e) => setRegisterInformations({ ...registerInformations, confirmEmail: e.target.value })}
                value={registerInformations.confirmEmail}
                placeholder='Confirm Email'
              />
              <input
                className='outline-none m-2 rounded-md py-1 px-3 border-2 border-black'
                type="password"
                onChange={(e) => setRegisterInformations({ ...registerInformations, password: e.target.value })}
                value={registerInformations.password}
                placeholder='Password'
              />
              <input
                className='outline-none m-2 rounded-md py-1 px-3 border-2 border-black'
                type="password"
                onChange={(e) => setRegisterInformations({ ...registerInformations, confirmPassword: e.target.value })}
                value={registerInformations.confirmPassword}
                placeholder='Confirm Password'
              />
              {
                isError ?
                  <div className='m-2 text-center text-red-600 font-bold'>{errorMessage}</div> :
                  <></>
              }
              <button className='bg-[#292929] py-1 px-3 rounded-md m-2 text-white' onClick={handleRegister}>Register</button>
              <button className='bg-[#292929] py-1 px-3 rounded-md m-2 text-white' onClick={() => setIsRegistering(false)}>Go back</button>
            </div> :
            <div className='flex flex-col'>
              <input className='outline-none m-2 rounded-md py-1 px-3 border-2 border-black' type="email" placeholder='Email' onChange={handleEmailChange} value={email} />
              <input className='outline-none m-2 rounded-md py-1 px-3 border-2 border-black' type="password" placeholder='Password' onChange={handlePasswordChange} value={password} />
              {
                isError ?
                  <div className='m-2 text-center text-red-600 font-bold'>
                    {errorMessage}
                  </div> :
                  <></>
              }
              <button className='bg-[#292929] py-1 px-3 rounded-md m-2 text-white' onClick={handleSignIn}>Sign In</button>
              <button className='bg-[#292929] py-1 px-3 rounded-md m-2 text-white' onClick={() => setIsRegistering(true)}>Create an account</button>
            </div>
        }
      </div>
    </div>
  )
}
