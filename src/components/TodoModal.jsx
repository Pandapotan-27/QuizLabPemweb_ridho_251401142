import { useState } from "react";
import { STATUS_OPTIONS, PRIORITY_OPTIONS } from "../data/dummyTodos.js";

const EMPTY = { title: "", description: "", status: "to-do", priority: "low", deadline: "" };

// Dipakai untuk "Tambah Todo" dan "Update Todo"
export default function TodoModal({ mode = "add", initial, onSubmit, onClose }) {
  const [form, setForm] = useState(initial ? { ...EMPTY, ...initial } : EMPTY);
  const [errors, setErrors] = useState({});
  const isEdit = mode === "edit";

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    const err = {};
    if (!form.title.trim()) err.title = "Judul wajib diisi";
    if (!form.deadline) err.deadline = "Deadline wajib diisi";
    setErrors(err);
    if (Object.keys(err).length) return;
    onSubmit({ ...form, title: form.title.trim(), description: form.description.trim() });
  };

  return (
    <div className="overlay" onClick={onClose}>
      <form className="modal" onClick={(e) => e.stopPropagation()} onSubmit={submit} noValidate>
        <h2 className="modal-title">{isEdit ? "Update Todo" : "Tambah Todo"}</h2>

        <label>Judul</label>
        <input name="title" value={form.title} onChange={change} autoFocus />
        {errors.title && <p className="error">{errors.title}</p>}

        <label>Deskripsi</label>
        <textarea name="description" rows={3} value={form.description} onChange={change} />

        <div className="row">
          <div>
            <label>Status</label>
            <select name="status" value={form.status} onChange={change}>
              {STATUS_OPTIONS.map((s) => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label>Prioritas</label>
            <select name="priority" value={form.priority} onChange={change}>
              {PRIORITY_OPTIONS.map((p) => <option key={p}>{p}</option>)}
            </select>
          </div>
        </div>

        <label>Deadline</label>
        <input type="date" name="deadline" value={form.deadline} onChange={change} />
        {errors.deadline && <p className="error">{errors.deadline}</p>}

        <div className="row actions">
          <button type="button" className="btn btn-red" onClick={onClose}>Batal</button>
          <button type="submit" className="btn btn-blue">{isEdit ? "Update" : "Tambah"}</button>
        </div>
      </form>
    </div>
  );
}
