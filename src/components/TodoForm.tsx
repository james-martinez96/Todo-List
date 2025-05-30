// TodoForm.tsx
import React from 'react';

interface TodoFormProps {
  title: string;
  description: string;
  onTitleChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onClick: (event: React.FormEvent) => void;
  onReset: () => void;
}

const TodoForm: React.FC<TodoFormProps> = ({
  title,
  description,
  onTitleChange,
  onDescriptionChange,
  onClick,
  onReset,
}) => {
  return (
    <form className="Form">
      {/* <label htmlFor="todo-title">Task Title</label> */}
      <input
        aria-label="Task Title"
        className="input"
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => onTitleChange(e.currentTarget.value)}
      />
      {/* <label htmlFor="description">Task Description</label> */}
      <input
        aria-label="Task Description"
        className="input"
        type="text"
        placeholder="Add todo item"
        value={description}
        onChange={(e) => onDescriptionChange(e.currentTarget.value)}
      />
      <div className="form-button-container">
        <button className="add-button" type="button" onClick={onClick}>
          Add
        </button>
        <button className="clear-button" type="button" onClick={onReset}>
          Clear
        </button>
      </div>
    </form>
  );
};

export default TodoForm;
