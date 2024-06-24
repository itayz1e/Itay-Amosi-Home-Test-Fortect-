import React, { useEffect, useRef, useState } from 'react'
import '../style/home.scss'

export interface Task {
  id: number
  name: string
  completed: boolean
}

const Home: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const storedTasksString = localStorage.getItem('tasks')
    return storedTasksString ? JSON.parse(storedTasksString) : []
  })
  const [deletedTasks, setDeletedTasks] = useState<Task[]>(() => {
    const storedDeletedTasksString = localStorage.getItem('deletedTasks')
    return storedDeletedTasksString ? JSON.parse(storedDeletedTasksString) : []
  })
  const taskInputRef = useRef<HTMLInputElement>(null)

  const addTask = (taskName: string) => {
    if (taskName.trim() !== '') {
      const newTaskId = tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1
      const newTask = { id: newTaskId, name: taskName, completed: false }
      setTasks((prevTasks) => [...prevTasks, newTask])
      if (taskInputRef.current) {
        taskInputRef.current.value = ''
        taskInputRef.current.focus()
      }
    }
  }

  const completeTask = (taskId: number) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    )
    setTasks(updatedTasks)
  }

  const deleteTask = (taskId: number) => {
    const deletedTask = tasks.find((task) => task.id === taskId)
    if (deletedTask) {
      setDeletedTasks((prevDeletedTasks) => [...prevDeletedTasks, deletedTask])
      const updatedTasks = tasks.filter((task) => task.id !== taskId)
      setTasks(updatedTasks)
    }
  }

  const filteredTasks = tasks.filter((task) => !task.completed) // סינון משימות שלא הושלמו

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  useEffect(() => {
    localStorage.setItem('deletedTasks', JSON.stringify(deletedTasks))
  }, [deletedTasks])

  return (
    <div className="home-page">
      <h1>Task Manager</h1>
      <input type="text" ref={taskInputRef} />
      <button onClick={() => addTask(taskInputRef.current?.value || '')}>Add Task</button>
      <ul>
        {filteredTasks.map((task) => (
          <li key={task.id}>
            {task.name}
            <button className='btn-completed' onClick={() => completeTask(task.id)}>
            Complete
            </button>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Home
