import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTodos } from "../context/TodoContext.jsx";
import TodoModal from "../components/TodoModal.jsx";
import ConfirmDialog from "../components/ConfirmDialog.jsx";

const EyeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
);
const TrashIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" /><path d="M10 11v6M14 11v6M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" /></svg>
);

export default function TodoList() {
  const { todos, addTodo, deleteTodo } = useTodos();
  const navigate = useNavigate();
  const [showAdd, setShowAdd] = useState(false);
  const [toDelete, setToDelete] = useState(null);

  return (
    <main className="container">
      <header className="page-header">
        <h1>Todo List</h1>
        <button className="btn btn-blue" onClick={() => setShowAdd(true)}>Tambah Todo</button>
      </header>

      <table className="table">
        <thead>
          <tr>
            <th>Judul</th><th>Status</th><th>Prioritas</th><th>Deadline</th><th className="center">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((t) => (
            <tr key={t.id}>
              <td>{t.title}</td>
              <td>{t.status}</td>
              <td>{t.priority}</td>
              <td>{t.deadline}</td>
              <td className="center">
                <button className="icon-btn btn-blue" aria-label={`Lihat detail ${t.title}`} onClick={() => navigate(`/todos/${t.id}`)}><EyeIcon /></button>
                <button className="icon-btn btn-red" aria-label={`Hapus ${t.title}`} onClick={() => setToDelete(t)}><TrashIcon /></button>
              </td>
            </tr>
          ))}
          {todos.length === 0 && (
            <tr><td colSpan={5} className="empty">Belum ada tugas. Klik "Tambah Todo" untuk membuat tugas pertama.</td></tr>
          )}
        </tbody>
      </table>

      {showAdd && (
        <TodoModal
          mode="add"
          onClose={() => setShowAdd(false)}
          onSubmit={(data) => { addTodo(data); setShowAdd(false); }}
        />
      )}

      {toDelete && (
        <ConfirmDialog
          title="Hapus Todo"
          message={`Yakin ingin menghapus "${toDelete.title}"? Tindakan ini tidak dapat dibatalkan.`}
          onCancel={() => setToDelete(null)}
          onConfirm={() => { deleteTodo(toDelete.id); setToDelete(null); }}
        />
      )}
    </main>
  );
}
