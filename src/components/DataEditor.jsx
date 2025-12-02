import React, { useState, useEffect } from 'react';

function DataEditor({ stationName, lineId, initialData, onSave, onDelete, onCancel }) {
  const [name, setName] = useState('');
  const [car, setCar] = useState(0);
  const [door, setDoor] = useState(0);
  const [note, setNote] = useState('');

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || '');
      setCar(initialData.car !== undefined ? initialData.car : 0);
      setDoor(initialData.door !== undefined ? initialData.door : 0);
      setNote(initialData.note || '');
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      id: initialData ? initialData.id : Date.now().toString(),
      name,
      car: parseInt(car),
      door: parseInt(door),
      note
    });
  };

  return (
    <div className="data-editor">
      <h2>{initialData ? 'Edit Exit' : 'Add Exit'} for {stationName}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Exit Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Wenceslas Square"
            required
          />
        </div>

        <div className="row">
          <div className="form-group">
            <label>Car (0-5, 0=Unknown)</label>
            <input
              type="number"
              min="0"
              max="5"
              value={car}
              onChange={(e) => setCar(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Door (0-4, 0=Unknown)</label>
            <input
              type="number"
              min="0"
              max="4"
              value={door}
              onChange={(e) => setDoor(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>Note (Optional)</label>
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="e.g. Escalator up"
          />
        </div>

        <div className="actions">
          {initialData && (
            <button type="button" onClick={() => onDelete(initialData.id)} className="delete-btn">
              Delete
            </button>
          )}
          <button type="button" onClick={onCancel} className="cancel-btn">Cancel</button>
          <button type="submit" className="save-btn">Save Exit</button>
        </div>
      </form>

      <style>{`
        .data-editor {
          background: var(--bg-secondary);
          padding: 1.5rem;
          border-radius: 8px;
          text-align: left;
        }
        .form-group {
          margin-bottom: 1rem;
        }
        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          color: var(--text-secondary);
          font-size: 0.9rem;
        }
        .form-group input {
          width: 100%;
          padding: 0.8rem;
          border-radius: 4px;
          border: 1px solid var(--bg-tertiary);
          background: var(--bg-primary);
          color: white;
          font-size: 1rem;
          box-sizing: border-box;
        }
        .row {
          display: flex;
          gap: 1rem;
        }
        .row .form-group {
          flex: 1;
        }
        .actions {
          display: flex;
          justify-content: flex-end;
          gap: 1rem;
          margin-top: 1.5rem;
        }
        .save-btn {
          background: var(--accent);
          color: white;
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        .cancel-btn {
          background: transparent;
          border: 1px solid var(--text-secondary);
          color: var(--text-secondary);
          padding: 0.5rem 1rem;
          border-radius: 4px;
          cursor: pointer;
        }
        .delete-btn {
          background: #ff4444;
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 4px;
          cursor: pointer;
          margin-right: auto;
        }
      `}</style>
    </div>
  );
}

export default DataEditor;
