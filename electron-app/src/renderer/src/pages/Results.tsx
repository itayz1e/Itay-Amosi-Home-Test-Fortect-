import React, { useState } from 'react';
import { Task } from './Home';
import "../style/results.scss";

interface Props {
  tasks: Task[];
  onDeleteTask: (taskId: number) => void;
}

const TaskItem: React.FC<Props> = ({ tasks, onDeleteTask }) => {
  return (
    <ul className="task-list">
      {tasks.map(task => (
        <li key={task.id}>
          {task.name}
          <button onClick={() => onDeleteTask(task.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

const Results: React.FC = () => {
  const storedTasksString = localStorage.getItem('tasks');
  const storedTasks: Task[] = storedTasksString ? JSON.parse(storedTasksString) : [];
  
  const storedDeletedTasksString = localStorage.getItem('deletedTasks');
  const initialDeletedTasks: Task[] = storedDeletedTasksString ? JSON.parse(storedDeletedTasksString) : [];
  const [deletedTasks, setDeletedTasks] = useState<Task[]>(initialDeletedTasks);

  const clearDeletedTasks = () => {
    localStorage.removeItem('deletedTasks');
    setDeletedTasks([]);
  };

  const deleteTask = (taskId: number) => {
    const taskToDelete = storedTasks.find(task => task.id === taskId);
    if (taskToDelete) {
      setDeletedTasks(prevDeletedTasks => [...prevDeletedTasks, taskToDelete]);
      const updatedTasks = storedTasks.filter(task => task.id !== taskId);
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }
  };

  return (
    <>
      <div className="results-page">
        <h1>Task History</h1>
        <TaskItem tasks={storedTasks} onDeleteTask={deleteTask} />
      </div>
      <div className="results-page-delete">
        <h1>Deleted Tasks</h1>
        <button onClick={clearDeletedTasks}>Clear Deleted Tasks History</button>
        <ul className='deleted-task-list'>
          {deletedTasks.map(task => (
            <li key={task.id}>
              Deleted Task: {task.name}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Results;
