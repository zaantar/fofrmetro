import { useState, useEffect } from 'react';
import { subscribeToData, saveData } from './utils/storage';
import LineSelect from './components/LineSelect';
import DirectionSelect from './components/DirectionSelect';
import StationSelect from './components/StationSelect';
import ResultList from './components/ResultList';
import DataEditor from './components/DataEditor';
import DataControls from './components/DataControls';
import ErrorBoundary from './components/ErrorBoundary';
import './index.css';

function App() {
  const [data, setData] = useState(null);
  const [selection, setSelection] = useState({
    lineId: null,
    direction: null,
    destination: null
  });
  const [editingExit, setEditingExit] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    let unsubscribe = () => { };
    const startSubscription = async () => {
      unsubscribe = await subscribeToData((newData) => {
        setData(newData);
      });
    };
    startSubscription();
    return () => unsubscribe();
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
      setEditingExit(null);
    } else if (selection.destination) {
      setSelection({ ...selection, destination: null });
    } else if (selection.direction) {
      setSelection({ ...selection, direction: null });
    } else if (selection.lineId) {
      setSelection({ ...selection, lineId: null });
    }
  };

  const handleSaveExit = async (exitToSave) => {
    const { destination, lineId } = selection;
    const updatedData = { ...data };

    // Ensure structure exists
    if (!updatedData.stations[destination]) updatedData.stations[destination] = { exits: {} };
    if (!updatedData.stations[destination].exits) updatedData.stations[destination].exits = {};
    if (!updatedData.stations[destination].exits[lineId]) updatedData.stations[destination].exits[lineId] = [];

    const exits = updatedData.stations[destination].exits[lineId];

    // If editing in reversed direction, reverse the values back to canonical before saving
    let canonicalExit = { ...exitToSave };
    delete canonicalExit._isReversed; // Remove the flag

    if (exitToSave._isReversed && exitToSave.car !== 0 && exitToSave.door !== 0) {
      canonicalExit.car = 6 - exitToSave.car;
      canonicalExit.door = 5 - exitToSave.door;
    }

    const existingIndex = exits.findIndex(e => e.id === canonicalExit.id);

    if (existingIndex >= 0) {
      // Update existing
      exits[existingIndex] = canonicalExit;
    } else {
      // Add new
      exits.push(canonicalExit);
    }

    try {
      await saveData(updatedData);
      setIsEditing(false);
      setEditingExit(null);
    } catch (e) {
      console.error("handleSaveExit: error saving", e);
      alert("Failed to save exit.");
    }
  };

  const handleDeleteExit = async (exitId) => {
    if (!window.confirm("Are you sure you want to delete this exit?")) return;

    const { destination, lineId } = selection;
    const updatedData = { ...data };
    const exits = updatedData.stations[destination].exits[lineId];

    updatedData.stations[destination].exits[lineId] = exits.filter(e => e.id !== exitId);

    try {
      await saveData(updatedData);
      setIsEditing(false);
      setEditingExit(null);
    } catch (e) {
      console.error("handleDeleteExit: error deleting", e);
      alert("Failed to delete exit.");
    }
  };

  const currentLine = selection.lineId ? data.lines[selection.lineId] : null;

  return (
    <ErrorBoundary>
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
                onEdit={(exit) => {
                  setEditingExit(exit);
                  setIsEditing(true);
                }}
              />
            </div>
          )}

          {selection.destination && isEditing && (
            <DataEditor
              stationName={selection.destination}
              lineId={selection.lineId}
              initialData={editingExit}
              onSave={handleSaveExit}
              onDelete={handleDeleteExit}
              onCancel={() => {
                setIsEditing(false);
                setEditingExit(null);
              }}
            />
          )}
        </main>
      </div>
    </ErrorBoundary>
  );
}

export default App;
