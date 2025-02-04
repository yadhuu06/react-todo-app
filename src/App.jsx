import React, { useEffect, useState } from "react";

export default function MyFun() {

  const getStoredData = (key) => {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : []; 
    } catch (error) {
      console.error(`Error parsing ${key} from localStorage:`, error);
      return []; 
    }
  };
  const [tasks, setTasks] = useState(() => getStoredData("Tasks"));
  const [completedTasks, setCompletedTasks] = useState(() => getStoredData("Completed"));
  const [input, setInput] = useState("");
  const [isEditing, setIsEditing] = useState(null);
  useEffect(() => {
    localStorage.setItem("Tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("Completed", JSON.stringify(completedTasks));
  }, [completedTasks]);
  const addTask = () => {
    if (input.trim() !== "") {
      if (isEditing !== null) {
        const updatedTasks = tasks.map((task, index) =>
          index === isEditing ? input : task
        );
        setTasks(updatedTasks);
        setIsEditing(null);
      } else {
        setTasks([...tasks, input]);
      }
      setInput("");
    }
  };

  const removeTask = (indexToRemove) => {
    setTasks(tasks.filter((_, index) => index !== indexToRemove));
  };

  const switchToEdit = (index) => {
    setIsEditing(index);
    setInput(tasks[index]);
  };

  const completeTask = (index) => {
    const taskToMove = tasks[index];
    setCompletedTasks([...completedTasks, taskToMove]);
    setTasks(tasks.filter((_, i) => i !== index));
  };
  

  return (
    <>

      <nav className="navbar">
        <h2 className="title">Todo List</h2>
        <div className="input-container">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add New Task"
            className="input-field"
          />
          <button className={`action-button ${isEditing !== null ? "edit" : "add"}`} onClick={addTask}>
            {isEditing !== null ? "Edit" : "Add"}
          </button>
        </div>
      </nav>


      <div className="main-container">

        <div className="card pending-tasks">
          <h3>Pending Tasks</h3>
          
          <ul>
            {tasks.length === 0 ? (
              <li>No pending tasks</li>
            ) : (
              tasks.map((task, index) => (
                <li key={index} className="task-item">
                  <input type="checkbox" onChange={() => completeTask(index)} />
                  <span>{task}</span>
                  <button className="edit-button" onClick={() => switchToEdit(index)}>
                    Edit
                  </button>
                  <button className="remove-button" onClick={() => removeTask(index)}>
                    Remove
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>


        <div className="card completed-tasks">
          <h3>Completed Tasks<button className="clear" onClick={()=>setCompletedTasks([])}>Clear All</button></h3>
          
          <ul>
            {completedTasks.length === 0 ? (
              <li>No completed tasks</li>
            ) : (
              completedTasks.map((task, index) => (
                <li key={index} className="completed-task">{task}</li>
              ))
            )}
          </ul>
        </div>
      </div>
    </>
  );
}