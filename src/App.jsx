import MidiList from "./midiList.jsx";

export function SearchBox() {
  return (
    <div className="search-box">
      <input type="text" placeholder="Search MIDI files..." />
    </div>
  );
}

export default function App() {
  return (
    <div className="container">
      <h1 id="main-title">Touch Music</h1>
      <SearchBox />
      <MidiList />
    </div>
  );
}