import { useState } from "react";
import MidiList from "./midiList.jsx";

export function SearchBox({ searchText, setSearchText }) {
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

  return (
    <div className="container">
      <h1 id="main-title">Touch Music</h1>

      <SearchBox
        searchText={searchText}
        setSearchText={setSearchText}
      />

      <MidiList searchText={searchText} />
    </div>
  );
}