import React from 'react';

function LineSelect({ lines, onSelect }) {
  return (
    <div className="line-select">
      <h2>Select Line</h2>
      <div className="line-grid">
        {Object.values(lines)
          .sort((a, b) => a.id.localeCompare(b.id))
          .map((line) => (
            <button
              key={line.id}
              className="line-card"
              style={{ '--line-color': line.color, borderColor: line.color }}
              onClick={() => onSelect(line.id)}
            >
              <div className="line-badge" style={{ backgroundColor: line.color }}>
                {line.id}
              </div>
              <span className="line-name">{line.name}</span>
            </button>
          ))}
      </div>
      <style>{`
        .line-grid {
          display: grid;
          gap: 1rem;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          margin-top: 1rem;
        }
        .line-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 2rem;
          background: var(--bg-secondary);
          border-width: 2px;
          border-style: solid;
          transition: transform 0.2s;
        }
        .line-card:active {
          transform: scale(0.98);
        }
        .line-badge {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          font-weight: bold;
          color: white;
          margin-bottom: 1rem;
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        }
        .line-name {
          font-size: 1.2rem;
          font-weight: 600;
        }
      `}</style>
    </div>
  );
}

export default LineSelect;
