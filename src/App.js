import { useState, useEffect } from "react"

import Container from "react-bootstrap/Container"

import { TASK_STATUS, useTasks } from "./contexts/TaskContext"

import AddViewTaskModal from "./components/AddViewTaskModal"
import TaskCard from "./components/TaskCard"
import Header from "./components/Header"
import Login from './components/Login';

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'
import Filter from "./components/Filter"




const firebaseConfig = {
  apiKey: "AIzaSyBi_-zxSmJa8LI80lV95MZPMBiWfsr927E",
  authDomain: "task-manager-677be.firebaseapp.com",
  projectId: "task-manager-677be",
  storageBucket: "task-manager-677be.appspot.com",
  messagingSenderId: "442998799985",
  appId: "1:442998799985:web:49538396419d5568b4a5d0"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const db = getFirestore(app);

function App() {
  const [showAddTaskModal, setShowAddTaskModal] = useState(false)
  const [status, setStatus] = useState(TASK_STATUS.ALL)

  const { tasks, getTaskByStatus } = useTasks()

  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    getTaskByStatus(status)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status])


  function openAddTaskModal() {
    setShowAddTaskModal(true)
  }

  return (
    user ?
      <>
        <Container className="my-4">
          <Header openAddTaskModal={openAddTaskModal} user={user} />
          <Filter status={status} setStatus={setStatus} />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(500px, 1fr))",
              gap: "1rem",
              alignItems: "flex-start",
            }}
          >
            {tasks.map(task => {
              return (
                <TaskCard
                  key={task.id}
                  id={task.id}
                  {...task}
                />
              )
            })}
          </div>
        </Container>
        <AddViewTaskModal
          show={showAddTaskModal}
          handleClose={() => setShowAddTaskModal(false)}
        />
      </>

      : <Login auth={auth} />
  )
}

export default App
