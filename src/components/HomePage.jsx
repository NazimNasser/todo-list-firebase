import { signOut } from 'firebase/auth'
import { onValue, ref, remove, set, update } from 'firebase/database'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { uid } from 'uid'
import { auth, db } from '../firebase'

export default function HomePage() {
  const [addTodo, setAddTodo] = useState('')
  const [todo, setTodo] = useState([])
  const [isEdit, setIsEdit] = useState(false)
  const [tempUidd, setTempUidd] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (!user) {
        navigate('/')
      }
      if (user) {
        onValue(ref(db, `/${auth.currentUser.uid}`), (snapshot) => {
          setTodo([])
          const data = snapshot.val()
          if (data !== null) {
            Object.values(data).map(todo => {
              setTodo(oldArray => [...oldArray, todo])
            })
          }
        })
      }
    })
  }, [])

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate('/')
      })
      .catch(err => console.log(err.message))
  }

  //add
  const writeTodoDatabase = () => {
    const uidd = uid()
    set(ref(db, `/${auth.currentUser.uid}/${uidd}`), {
      addTodo: addTodo,
      uidd: uidd
    })
    setAddTodo('')
  }
  //update
  const handleUpdate = (todo) => {
    setIsEdit(true)
    setAddTodo(todo.addTodo)
    setTempUidd(todo.uidd)
  }
  const handleConfirm = () => {
    update(ref(db, `/${auth.currentUser.uid}/${tempUidd}`), {
      addTodo: addTodo,
      tempUidd: tempUidd
    })
    setAddTodo('')
    setIsEdit(false)
  }
  //delete
  const handleDelete = (uid) => {
    remove(ref(db, `/${auth.currentUser.uid}/${uid}`))
  }

  return (
    <div className='w-[40%] sm:w-[90%] md:w-[60%] mx-auto'>
      <h1 className='text-center py-10 text-4xl font-bold'>Welcome</h1>
      <div className='flex justify-between sm:justify-end sm:flex-wrap'>
        <input className='outline-none border-2 my-2 rounded-md py-1 w-[70%] sm:w-full px-3 border-black' type="text" placeholder='Add title...' value={addTodo} onChange={(e) => setAddTodo(e.target.value)} />
        {
          isEdit ?
            <button className='bg-[#3219c2] py-1 px-3 rounded-md ml-2 my-2 text-white' onClick={handleConfirm}>Confirm</button>
            :
            <button className='bg-[#3219c2] py-1 px-3 rounded-md ml-2 my-2 text-white' onClick={writeTodoDatabase}>Add</button>
        }
        <button className='bg-[#292929] py-1 px-3 rounded-md ml-2 my-2 text-white' onClick={handleSignOut}>Signout</button>
      </div>
      {
        todo.map(todo => (
          <div className='flex py-5 items-center justify-between'>
            <div className='w-[70%] text-xl border-b-2'>{todo.addTodo}</div>
            <button className='bg-[#19c23e] py-1 px-3 rounded-md ml-2 my-2 text-white' onClick={() => handleUpdate(todo)}>Update</button>
            <button className='bg-[#c21919] py-1 px-3 rounded-md ml-2 my-2 text-white' onClick={() => handleDelete(todo.uidd)}>Delete</button>
          </div>
        ))
      }
    </div>
  )
}
