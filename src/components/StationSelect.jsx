import React, { useState } from 'react';

function StationSelect({ line, direction, onSelect, onBack }) {
  const [search, setSearch] = useState('');

  // Filter stations based on search
  // Also, we might want to order them based on the direction?
  // For now, just listing them is fine.
  // Ideally, we should filter out stations that are "behind" us if we knew the starting point,
  // but the user only selects line -> direction -> destination.

  const filteredStations = line.stations.filter(s =>
    s.toLowerCase().includes(search.toLowerCase()) && s !== direction
  );

  return (
    <div className="station-select">
      <div className="station-header">
        <button className="back-btn" onClick={onBack}>&larr; Back</button>
        <div className="header-text">
          <h2>Destination</h2>
          <p>Line {line.id} towards {direction}</p>
        </div>
      </div>

      <input
        type="text"
        placeholder="Search station..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
        autoFocus
      />

      <div className="station-list">
        {filteredStations.map((station) => (
          <button
            key={station}
            className="station-item"
            onClick={() => onSelect(station)}
          >
            {station}
          </button>
        ))}
      </div>
      <style>{`
        .station-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.5rem;
          text-align: left;
        }
        .header-text {
          text-align: right;
        }
        .header-text h2 {
          margin: 0;
          font-size: 1.5rem;
        }
        .header-text p {
          margin: 0;
          color: var(--text-secondary);
          font-size: 0.9rem;
        }
        .back-btn {
          padding: 0.5rem 1rem;
          background: transparent;
          border: 1px solid var(--text-secondary);
          color: var(--text-secondary);
        }
        .back-btn:hover {
          border-color: var(--text-primary);
          color: var(--text-primary);
        }
        .search-input {
          width: 100%;
          padding: 1rem;
          font-size: 1.1rem;
          background: var(--bg-tertiary);
          border: none;
          border-radius: 8px;
          color: white;
          margin-bottom: 1rem;
          box-sizing: border-box;
        }
        .search-input:focus {
          outline: 2px solid var(--accent);
        }
        .station-list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          max-height: 60vh;
          overflow-y: auto;
        }
        .station-item {
          text-align: left;
          padding: 1rem;
          background: var(--bg-secondary);
          font-size: 1.1rem;
          display: flex;
          align-items: center;
        }
      `}</style>
    </div>
  );
}

export default StationSelect;
