import React, { useContext, useState } from "react"
import { v4 as uuidV4 } from "uuid"

import useLocalStorage from "../hooks/useLocalStorage"

const TasksContext = React.createContext()

export const TASK_STATUS = {
  'TO_DO': 'To Do',
  'IN_PROGRESS': 'In Progress',
  'DONE': 'Done',
  'ALL': 'All'
}

export function useTasks() {
  return useContext(TasksContext)
}

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useLocalStorage("tasks", [])
  const [tasksByStatus, setTaskByStatus] = useState([]);

  function getTaskByStatus(status) {
    if (status === TASK_STATUS.ALL) {
      setTaskByStatus(tasks);
      return
    }
    const tempTasks = [...tasks];
    setTaskByStatus(tempTasks.filter(task => task.status === status));
  }

  function addTask({ description, title, status }) {
    const __tasks = [...tasks, { id: uuidV4(), description, title, status }]
    setTasks(__tasks);
    setTaskByStatus(__tasks);
  }

  function editTask({ id, status }) {
    const editedTasks = tasks.map(task => {
      if (task?.id === id) {
        return {
          ...task,
          status
        }
      }
      return task
    })
    setTasks(editedTasks)
    setTaskByStatus(editedTasks)
  }

  function deleteTask(id) {
    console.log({ id })
    const __tempTasks = [...tasks]?.filter(task => task.id !== id);
    setTasks(__tempTasks);
    setTaskByStatus(__tempTasks);
  }

  return (
    <TasksContext.Provider
      value={{
        tasks: tasksByStatus,
        getTaskByStatus,
        addTask,
        deleteTask,
        editTask
      }}
    >
      {children}
    </TasksContext.Provider>
  )
}
