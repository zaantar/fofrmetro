import { useState, useEffect } from 'react';
import { getStoredData, saveStoredData } from './utils/storage';
import LineSelect from './components/LineSelect';
import DirectionSelect from './components/DirectionSelect';
import StationSelect from './components/StationSelect';
import ResultList from './components/ResultList';
import DataEditor from './components/DataEditor';
import DataControls from './components/DataControls';
import './index.css';

function App() {
  const [data, setData] = useState(null);
  const [selection, setSelection] = useState({
    lineId: null,
    direction: null,
    destination: null
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setData(getStoredData());
  }, []);

  if (!data) return <div>Loading...</div>;

  const handleLineSelect = (lineId) => {
    setSelection({ ...selection, lineId });
  };

  const handleDirectionSelect = (direction) => {
    setSelection({ ...selection, direction });
  };

  const handleStationSelect = (destination) => {
    setSelection({ ...selection, destination });
  };

  const handleBack = () => {
    if (isEditing) {
      setIsEditing(false);
    } else if (selection.destination) {
      setSelection({ ...selection, destination: null });
    } else if (selection.direction) {
      setSelection({ ...selection, direction: null });
    } else if (selection.lineId) {
      setSelection({ ...selection, lineId: null });
    }
  };

  const handleSaveExit = (newExit) => {
    const { destination, lineId } = selection;
    const updatedData = { ...data };

    // Ensure station entry exists
    if (!updatedData.stations[destination]) {
      updatedData.stations[destination] = { exits: {} };
    }
    if (!updatedData.stations[destination].exits) {
      updatedData.stations[destination].exits = {};
    }
    if (!updatedData.stations[destination].exits[lineId]) {
      updatedData.stations[destination].exits[lineId] = [];
    }

    updatedData.stations[destination].exits[lineId].push(newExit);

    setData(updatedData);
    saveStoredData(updatedData);
    setIsEditing(false);
  };

  const currentLine = selection.lineId ? data.lines[selection.lineId] : null;

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 onClick={() => setSelection({ lineId: null, direction: null, destination: null })} style={{ cursor: 'pointer' }}>
          Fofrmetro
        </h1>
      </header>

      <main>
        {!selection.lineId && (
          <>
            <LineSelect lines={data.lines} onSelect={handleLineSelect} />
            <DataControls data={data} onImport={setData} />
          </>
        )}

        {selection.lineId && !selection.direction && (
          <DirectionSelect
            line={currentLine}
            onSelect={handleDirectionSelect}
            onBack={handleBack}
          />
        )}

        {selection.lineId && selection.direction && !selection.destination && (
          <StationSelect
            line={currentLine}
            direction={selection.direction}
            onSelect={handleStationSelect}
            onBack={handleBack}
          />
        )}

        {selection.destination && !isEditing && (
          <div className="result-view">
            <button className="back-btn" onClick={handleBack}>&larr; Back</button>
            <ResultList
              stationName={selection.destination}
              lineId={selection.lineId}
              direction={selection.direction}
              data={data}
              onEdit={() => setIsEditing(true)}
            />
          </div>
        )}

        {selection.destination && isEditing && (
          <DataEditor
            stationName={selection.destination}
            lineId={selection.lineId}
            onSave={handleSaveExit}
            onCancel={() => setIsEditing(false)}
          />
        )}
      </main>
    </div>
  );
}

export default App;
