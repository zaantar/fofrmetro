import React, { useRef } from 'react';
import { saveData } from '../utils/storage';

function DataControls({ data, onImport }) {
    const fileInputRef = useRef(null);

    const handleExport = () => {
        const jsonString = JSON.stringify(data, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `fofrmetro-data-${new Date().toISOString().slice(0, 10)}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleImportClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = async (event) => {
            try {
                const importedData = JSON.parse(event.target.result);
                // Basic validation
                if (importedData.lines && importedData.stations) {
                    await saveData(importedData);
                    // onImport(importedData); // Removed to rely on Firestore subscription
                    alert('Data imported successfully!');
                } else {
                    alert('Invalid data format.');
                }
            } catch (err) {
                console.error(err);
                alert('Failed to parse JSON.');
            }
        };
        reader.readAsText(file);
    };

    return (
        <div className="data-controls">
            <button onClick={handleExport} className="control-btn">Export Data</button>
            <button onClick={handleImportClick} className="control-btn">Import Data</button>
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                accept=".json"
                onChange={handleFileChange}
            />
            <style>{`
        .data-controls {
          margin-top: 3rem;
          display: flex;
          gap: 1rem;
          justify-content: center;
          padding-top: 2rem;
          border-top: 1px solid var(--bg-tertiary);
        }
        .control-btn {
          background: transparent;
          border: 1px solid var(--text-secondary);
          color: var(--text-secondary);
          font-size: 0.9rem;
          padding: 0.5rem 1rem;
          cursor: pointer;
          border-radius: 4px;
        }
        .control-btn:hover {
          border-color: var(--text-primary);
          color: var(--text-primary);
        }
      `}</style>
        </div>
    );
}

export default DataControls;
