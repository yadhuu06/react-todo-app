import React, { useState } from "react";


export default function MyFun() {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState("");
  const [isEditing, setIsEditing] = useState(null);

  const addItem = () => {
    if (input.trim() !== "") {
      if (isEditing !== null) {
        const updatedItems = items.map((item, index) =>
          index === isEditing ? input : item
        );
        setItems(updatedItems);
        setIsEditing(null);
      } else {
        setItems([...items, input]);
      }
      setInput("");
    }
  };


  return (
    
    <div className="container">
      
      <div className="todo-box">
      <h2 className="title">Todo List
      </h2>
      <p> Total Task :{items.length}</p>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type the Task"
          className="input-field"
        />
        <button className={`action-button ${isEditing !== null ? "edit" : "add"}`} onClick={addItem}>
          {isEditing !== null ? "Edit" : "Add"}
        </button>
        <div>
          {items.map((item, index) => (
            <div className="todo-item" key={index}>
              <p className="todo-text">{item}</p>
              <button className="edit-button" onClick={() => switchToEdit(index)}>
              edit
              </button>
              <button className="remove-button" onClick={() => removeItem(index)}>
                Remove
                
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
