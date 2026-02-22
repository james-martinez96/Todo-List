import React, { useEffect, useRef } from 'react';

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
    const titleInputRef = useRef<HTMLInputElement>(null);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit();
    };

    useEffect(() => {
        if (title === '' && description === '') {
            titleInputRef.current?.focus();
        }
    }, [title, description]);

    return (
        <form className="Form" onSubmit={handleSubmit}>
            <label htmlFor="todo-title">Title</label>
            <input
                ref={titleInputRef}
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

            <div className="form-button-container">
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
