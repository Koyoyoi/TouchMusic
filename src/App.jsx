import { useState } from "react";
import MidiList from "./MidiList";
import Player from "./Player";

function SearchBox({ searchText, setSearchText }) {
  return (
    <div className="search-box">
      <input
        type="text"
        placeholder="Search MIDI files..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
    </div>
  );
}

export default function App() {
  const [searchText, setSearchText] = useState("");
  const [selectedMidi, setSelectedMidi] = useState(null);

  if (selectedMidi) {
    return (
      <Player
        midi={selectedMidi}
        onBack={() => setSelectedMidi(null)}
      />
    );
  }

  return (
    <div className="container">
      <h1 id="main-title">Touch Music</h1>

      <SearchBox
        searchText={searchText}
        setSearchText={setSearchText}
      />

      <MidiList
        searchText={searchText}
        onSelectMidi={setSelectedMidi}
      />
    </div>
  );
}