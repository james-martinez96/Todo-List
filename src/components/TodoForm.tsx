import React from 'react'

interface TodoFormProps {
  title: string;
  description: string;
  onTitleChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onSubmit: () => void;
  onReset: () => void;

}

const TodoForm: React.FC<TodoFormProps> = ({
  title,
  description,
  onTitleChange,
  onDescriptionChange,
  onSubmit: onSubmit,
  onReset,
}) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form className="Form" onSubmit={handleSubmit}>
      <label htmlFor="todo-title">Title</label>
      <input
        id="todo-title"
        aria-label="Task Title"
        className="input"
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => onTitleChange(e.currentTarget.value)}
      />

      <label htmlFor="description">Description</label>
      <input
        id="description"
        aria-label="Task Description"
        className="input"
        type="text"
        placeholder="Add todo item"
        value={description}
        onChange={(e) => onDescriptionChange(e.currentTarget.value)}
      />

      <div className="button-container">
        <button className="add-button" type="submit" onClick={onSubmit}>
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
