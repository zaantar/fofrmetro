import React, { useState } from 'react';

function DataEditor({ stationName, lineId, onSave, onCancel }) {
    const [name, setName] = useState('');
    const [car, setCar] = useState(1);
    const [door, setDoor] = useState(1);
    const [note, setNote] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({
            id: Date.now().toString(), // Simple ID generation
            name,
            car: parseInt(car),
            door: parseInt(door),
            note
        });
    };

    return (
        <div className="data-editor">
            <h2>Add Exit for {stationName}</h2>
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
                        <label>Car (1-5)</label>
                        <input
                            type="number"
                            min="1"
                            max="5"
                            value={car}
                            onChange={(e) => setCar(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Door (1-4)</label>
                        <input
                            type="number"
                            min="1"
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
        }
        .cancel-btn {
          background: transparent;
          border: 1px solid var(--text-secondary);
        }
      `}</style>
        </div>
    );
}

export default DataEditor;
