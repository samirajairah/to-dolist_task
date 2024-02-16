import { useEffect, useState } from "react";
import { Header } from "./components/Header";
import { Tasks } from "./components/Tasks";

const LOCAL_STORAGE_KEY = "todo:tasks";

function App() {
  const [tasks, setTasks] = useState([]);

  function loadSavedTasks() {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      setTasks(JSON.parse(saved));
    }
  }

  function setTasksAndSave(newTasks) {
    setTasks(newTasks);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newTasks));
  }

  useEffect(() => {
    loadSavedTasks();
  }, []);

  function addTask(taskTitle) {
    const currentDate = new Date();
    const newTask = {
      id: crypto.randomUUID(),
      title: taskTitle,
      isCompleted: false,
      createdAt: currentDate.toString(),
    };
    setTasksAndSave([...tasks, newTask]);
  }

  function deleteTaskById(taskId) {
    const newTasks = tasks.filter((task) => task.id !== taskId);
    setTasksAndSave(newTasks);
  }

  function toggleTaskCompletedById(taskId) {
    const newTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          isCompleted: !task.isCompleted,
        };
      }
      return task;
    });
    setTasksAndSave(newTasks);
  }

  function editTaskById(taskId, newTitle) {
    const newTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          title: newTitle,
        };
      }
      return task;
    });
    setTasksAndSave(newTasks);
  }

  function clearAllTasks() {
    setTasksAndSave([]);
  }

  function markAllTasksAsCompleted() {
    const updatedTasks = tasks.map((task) => ({
      ...task,
      isCompleted: true,
    }));
    setTasksAndSave(updatedTasks);
  }

  function handleSelectAll(selectAll) {
    const updatedTasks = tasks.map((task) => ({
      ...task,
      isCompleted: selectAll,
    }));
    setTasksAndSave(updatedTasks);
  }

  return (
    <>
      <Header
        handleAddTask={addTask}
        handleClearAll={clearAllTasks}
        handleDoneAll={markAllTasksAsCompleted}
        handleSelectAll={handleSelectAll}
      />
      <Tasks
        tasks={tasks}
        onDelete={deleteTaskById}
        onComplete={toggleTaskCompletedById}
        onEdit={editTaskById}
      />
    </>
  );
}

export default App;
