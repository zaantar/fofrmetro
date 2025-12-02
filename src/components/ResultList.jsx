import React from 'react';

function ResultList({ stationName, lineId, direction, data, onEdit }) {
    const stationData = data.stations[stationName];
    const exits = stationData?.exits?.[lineId] || [];

    // Logic to determine "front" or "back" of train based on direction
    // This is tricky without knowing the exact station order and direction logic.
    // For now, we assume the user just wants to see the car/door info.
    // We can add a "Reverse Order" toggle if needed, or infer it from the line index.

    return (
        <div className="result-list">
            <div className="result-header">
                <h3>Exits for {stationName}</h3>
                <button className="edit-btn" onClick={onEdit}>Edit / Add</button>
            </div>

            {exits.length === 0 ? (
                <div className="no-data">
                    <p>No exit data found for this station.</p>
                    <p>Be the first to add one!</p>
                </div>
            ) : (
                <div className="exits-container">
                    {exits.map((exit) => (
                        <div key={exit.id} className="exit-card">
                            <div className="exit-info">
                                <span className="exit-name">{exit.name}</span>
                                {exit.note && <span className="exit-note">{exit.note}</span>}
                            </div>
                            <div className="train-position">
                                <div className="position-box">
                                    <span className="label">Car</span>
                                    <span className="value">{exit.car}</span>
                                </div>
                                <div className="position-box">
                                    <span className="label">Door</span>
                                    <span className="value">{exit.door}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <style>{`
        .result-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }
        .edit-btn {
          font-size: 0.8rem;
          padding: 0.4rem 0.8rem;
          background: var(--bg-tertiary);
          color: var(--accent);
          border: 1px solid var(--accent);
        }
        .exits-container {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .exit-card {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: var(--bg-secondary);
          padding: 1rem;
          border-radius: 8px;
          border-left: 4px solid var(--accent);
        }
        .exit-info {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
        }
        .exit-name {
          font-weight: bold;
          font-size: 1.1rem;
        }
        .exit-note {
          font-size: 0.8rem;
          color: var(--text-secondary);
        }
        .train-position {
          display: flex;
          gap: 0.5rem;
        }
        .position-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          background: var(--bg-tertiary);
          padding: 0.5rem;
          border-radius: 4px;
          min-width: 40px;
        }
        .position-box .label {
          font-size: 0.7rem;
          text-transform: uppercase;
          color: var(--text-secondary);
        }
        .position-box .value {
          font-size: 1.2rem;
          font-weight: bold;
        }
        .no-data {
          padding: 2rem;
          background: var(--bg-secondary);
          border-radius: 8px;
          color: var(--text-secondary);
        }
      `}</style>
        </div>
    );
}

export default ResultList;
