import { useState } from "react";
import LoadButton from "./MidiListComp/LoadButton.jsx";
import SearchBox from "./MidiListComp/SearchBox.jsx";
import MidiList from "./MidiListComp/MidiList.jsx";
import "./App.css";

export default function App() {
  const [midiList, setMidiList] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const filteredList = midiList.filter((m) =>
    (m.title || "").toLowerCase().includes(search.toLowerCase()) ||
    (m.composer || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app-container">

      <h1 className="title">Touch Music</h1>

      <LoadButton
        setMidiList={setMidiList}
        setLoading={setLoading}
      />

      <SearchBox search={search} setSearch={setSearch} />

      {loading && <p className="loading">Loading...</p>}

      {!loading && (
        <MidiList list={filteredList} />
      )}

    </div>
  );
}