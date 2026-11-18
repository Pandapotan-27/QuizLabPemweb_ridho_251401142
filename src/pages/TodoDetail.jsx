import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTodos } from "../context/TodoContext.jsx";
import TodoModal from "../components/TodoModal.jsx";

export default function TodoDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getTodo, updateTodo } = useTodos();
  const [showEdit, setShowEdit] = useState(false);
  const todo = getTodo(id);

  if (!todo) {
    return (
      <main className="container narrow">
        <div className="card">
          <h3>Tugas tidak ditemukan</h3>
          <p className="muted">Tugas dengan ID {id} mungkin sudah dihapus.</p>
          <button className="btn btn-red" onClick={() => navigate("/")}>Kembali</button>
        </div>
      </main>
    );
  }

  return (
    <main className="container narrow">
      <div className="card detail">
        <div>
          <h3>Judul</h3>
          <p>{todo.title}</p>
          <h3>Deskripsi</h3>
          <textarea className="desc" rows={5} value={todo.description} readOnly />
        </div>
        <div>
          <h3>Status</h3><p>{todo.status}</p>
          <h3>Prioritas</h3><p>{todo.priority}</p>
          <h3>Deadline</h3><p>{todo.deadline}</p>
          <div className="row actions">
            <button className="btn btn-red" onClick={() => navigate("/")}>Kembali</button>
            <button className="btn btn-blue" onClick={() => setShowEdit(true)}>Update</button>
          </div>
        </div>
      </div>

      {showEdit && (
        <TodoModal
          mode="edit"
          initial={todo}
          onClose={() => setShowEdit(false)}
          onSubmit={(data) => { updateTodo(todo.id, data); setShowEdit(false); }}
        />
      )}
    </main>
  );
}
