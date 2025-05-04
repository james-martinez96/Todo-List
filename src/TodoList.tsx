import { useState, useEffect } from "react";
import TodoItem from "./components/TodoItem";
import TodoForm from "./components/TodoForm";
import { Item } from "./Interfaces"

export const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Item[]>([]);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [editingTodo, setEditingTodo] = useState<Item | null>(null);

  const saveTodos = (todos: Item[]) => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const onToggle = (id: number) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setTodos(updatedTodos);
    saveTodos(updatedTodos);
    console.log(updatedTodos);
  };

  const onEdit = (id: number) => {
    const todo = todos.find((todo) => todo.id === id);
    setEditingTodo(todo || null);
  };

  const onUpdate = (id: number, title: string, description: string) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, title: title, description: description };
      }
      return todo;
    });
    setTodos(updatedTodos);
    setEditingTodo(null);
    saveTodos(updatedTodos);
  };

  const onDelete = (id: number) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
    saveTodos(newTodos);
  };

  const onReset = () => {
    localStorage.clear();
    setTodos([]);
  };

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const newTodo: Item = {
      id: Date.now(),
      title: title,
      description: description,
      completed: false,
    };
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    saveTodos(updatedTodos);
    setDescription("");
    setTitle("");
  };

  useEffect(() => {
    try {
      const storedTodos = localStorage.getItem("todos");
      if (storedTodos) {
        setTodos(JSON.parse(storedTodos));
      } else {
        setTodos([]);
      }
    } catch (error) {
      console.error("Error loading todos from local storage", error);
    }
  }, []);

  return (
    <div className="main-container">
      <h1 className="Main">Todo List</h1>
      <ul className="Card-Grid">
        {todos.map((todo) => (
          <TodoItem 
            key={todo.id}
            todo={todo}
            editingTodo={editingTodo}
            onToggle={onToggle}
            onEdit={onEdit}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
        ))}
      </ul>
      <TodoForm 
        title={title}
        description={description}
        onTitleChange={setTitle}
        onDescriptionChange={setDescription}
        onClick={onSubmit}
        onReset={onReset}
      />
    </div>
  );
};
