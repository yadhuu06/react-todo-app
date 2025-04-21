import React, { useEffect, useState } from "react";
import "./index.css";

export default function FuturisticTodo() {
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
  const [isHovered, setIsHovered] = useState(null);

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

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTask();
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

  const moveBack = (index) => {
    const taskToMove = completedTasks[index];
    setTasks([...tasks, taskToMove]);
    setCompletedTasks(completedTasks.filter((_, i) => i !== index));
  };

  return (
    <div className="app-container">
      {/* Header */}
      <header className="app-header">
        <div className="header-container">
          <h1 className="app-title">
            <span className="title-wrapper">
              TASK
              <span className="title-accent">SYNC</span>
              <span className="title-underline"></span>
            </span>
          </h1>
          
          <div className="input-wrapper">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Add New Task"
              className="task-input"
            />
            <button 
              onClick={addTask}
              className={`action-button ${isEditing !== null ? "edit-mode" : ""}`}
            >
              {isEditing !== null ? "UPDATE" : "ADD"}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="app-main">
        <div className="task-grid">
          {/* Pending Tasks */}
          <div className="task-container">
            <div className="container-header">
              <h2 className="container-title">
                <span className="status-indicator pending"></span>
                Pending Tasks
                <span className="task-count">({tasks.length})</span>
              </h2>
            </div>
            
            <div className="container-content">
              {tasks.length === 0 ? (
                <div className="empty-state">
                  <p>No pending tasks</p>
                </div>
              ) : (
                <ul className="task-list">
                  {tasks.map((task, index) => (
                    <li 
                      key={index} 
                      className={`task-item ${isHovered === index ? "hovered" : ""}`}
                      onMouseEnter={() => setIsHovered(index)}
                      onMouseLeave={() => setIsHovered(null)}
                    >
                      <div className="task-content">
                        <button 
                          onClick={() => completeTask(index)}
                          className="complete-button"
                        >
                          <span className="check-mark">✓</span>
                        </button>
                        <span className="task-text">{task}</span>
                      </div>
                      
                      <div className="task-actions">
                        <button 
                          onClick={() => switchToEdit(index)}
                          className="edit-button"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => removeTask(index)}
                          className="delete-button"
                        >
                          Delete
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Completed Tasks */}
          <div className="task-container">
            <div className="container-header">
              <h2 className="container-title">
                <span className="status-indicator completed"></span>
                Completed Tasks
                <span className="task-count">({completedTasks.length})</span>
              </h2>
              
              {completedTasks.length > 0 && (
                <button 
                  onClick={() => setCompletedTasks([])}
                  className="clear-button"
                >
                  Clear All
                </button>
              )}
            </div>
            
            <div className="container-content">
              {completedTasks.length === 0 ? (
                <div className="empty-state">
                  <p>No completed tasks</p>
                </div>
              ) : (
                <ul className="task-list">
                  {completedTasks.map((task, index) => (
                    <li key={index} className="task-item completed">
                      <div className="task-content">
                        <span className="complete-indicator">
                          <span className="check-mark visible">✓</span>
                        </span>
                        <span className="task-text">{task}</span>
                      </div>
                      
                      <button 
                        onClick={() => moveBack(index)}
                        className="restore-button"
                      >
                        Restore
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="app-footer">
        <div className="footer-content">
          <p>TaskSync © {new Date().getFullYear()} | Futuristic Task Management</p>
        </div>
      </footer>
    </div>
  );
}