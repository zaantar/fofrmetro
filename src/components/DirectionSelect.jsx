import React from 'react';

function DirectionSelect({ line, onSelect, onBack }) {
    const terminals = [
        line.stations[0],
        line.stations[line.stations.length - 1]
    ];

    return (
        <div className="direction-select">
            <button className="back-btn" onClick={onBack}>&larr; Back</button>
            <h2>Direction</h2>
            <p>Where are you heading?</p>
            <div className="direction-list">
                {terminals.map((terminal) => (
                    <button
                        key={terminal}
                        className="direction-card"
                        onClick={() => onSelect(terminal)}
                    >
                        <span className="direction-label">To</span>
                        <span className="direction-name">{terminal}</span>
                    </button>
                ))}
            </div>
            <style>{`
        .direction-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-top: 1rem;
        }
        .direction-card {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          padding: 1.5rem;
          background: var(--bg-secondary);
          text-align: left;
          border-left: 4px solid var(--line-color, #fff);
        }
        .direction-label {
          font-size: 0.9rem;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .direction-name {
          font-size: 1.5rem;
          font-weight: bold;
          margin-top: 0.2rem;
        }
        .back-btn {
          background: transparent;
          padding: 0;
          margin-bottom: 1rem;
          color: var(--text-secondary);
          font-size: 0.9rem;
        }
      `}</style>
        </div>
    );
}

export default DirectionSelect;
