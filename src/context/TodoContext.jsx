import { createContext, useCallback, useContext, useState } from "react";
import { dummyTodos } from "../data/dummyTodos.js";

const TodoContext = createContext(null);

export function TodoProvider({ children }) {
  const [todos, setTodos] = useState(dummyTodos);
  const [toast, setToast] = useState(null);

  const notify = useCallback((message, type = "success") => {
    const key = Date.now();
    setToast({ message, type, key });
    setTimeout(() => setToast((t) => (t && t.key === key ? null : t)), 2800);
  }, []);

  // Nanti: ganti isi fungsi-fungsi ini dengan pemanggilan REST API (fetch/axios)
  const addTodo = (data) => {
    setTodos((prev) => {
      const id = prev.length ? Math.max(...prev.map((t) => t.id)) + 1 : 1;
      return [...prev, { ...data, id }];
    });
    notify("Tugas berhasil ditambahkan");
  };

  const updateTodo = (id, data) => {
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, ...data, id } : t)));
    notify("Tugas berhasil diperbarui");
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
    notify("Tugas berhasil dihapus");
  };

  const getTodo = (id) => todos.find((t) => t.id === Number(id));

  return (
    <TodoContext.Provider value={{ todos, addTodo, updateTodo, deleteTodo, getTodo }}>
      {children}
      {toast && (
        <div key={toast.key} className={`toast toast-${toast.type}`} role="status">
          {toast.message}
        </div>
      )}
    </TodoContext.Provider>
  );
}

export const useTodos = () => useContext(TodoContext);
