export default function ConfirmDialog({ title, message, onConfirm, onCancel }) {
  return (
    <div className="overlay" onClick={onCancel}>
      <div className="modal modal-sm" role="alertdialog" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-title">{title}</h2>
        <p className="confirm-text">{message}</p>
        <div className="row actions">
          <button className="btn btn-gray" onClick={onCancel}>Batal</button>
          <button className="btn btn-red" onClick={onConfirm}>Hapus</button>
        </div>
      </div>
    </div>
  );
}
