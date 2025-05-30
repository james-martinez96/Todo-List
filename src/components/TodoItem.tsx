import React, { useState, useEffect } from "react";
import { Item } from "../Interfaces";

interface TodoItemProps {
  todo: Item;
  editingTodo: Item | null;
  onToggle: (id: number) => void;
  onEdit: (id: number) => void;
  onUpdate: (id: number, title: string, description: string) => void;
  onDelete: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  editingTodo,
  onToggle,
  onEdit,
  onUpdate,
  onDelete,
}) => {
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  useEffect(() => {
    if (editingTodo?.id === todo.id) {
      console.log(editingTodo)
      setEditTitle(editingTodo.title);
      setEditDescription(editingTodo.description);
    }
  }, [editingTodo, todo.id]);

  const handleBlur = () => {
    onUpdate(todo.id, editTitle, editDescription);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleBlur();
    }
  };

  return (
    <li className="Item" key={todo.id}>
      {editingTodo?.id === todo.id ? (
        <div className="todo-input-container">
          <input
            className="title-input"
            aria-label="Edit Title"
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.currentTarget.value)}
            // onBlur={handleBlur}
            onKeyDown={handleKeyDown}
          />
          <textarea
            className="edit-input"
            aria-label="Edit Description"
            // type="text"
            value={editDescription}
            onChange={(e) => setEditDescription(e.currentTarget.value)}
            // onBlur={handleBlur}
            onKeyDown={handleKeyDown}
          />
        </div>
      ) : (
        <div
          id="item-list"
          onClick={() => onToggle(todo.id)}
          className={todo.completed ? "completed" : ""}
        >
          <div className="card-container">
            <h3 className="todo-title">{todo.title}</h3>
            <p className="description">{todo.description}</p>
          </div>
        </div>
      )}
      <div className="list-button-container">
        <button className="edit-button" onClick={() => onEdit(todo.id)}>
          Edit
        </button>
        <button className="delete-button" onClick={() => onDelete(todo.id)}>
          Delete
        </button>
      </div>
    </li>
  );
};

export default TodoItem;
