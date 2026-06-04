import MidiItem from "./MidiItem";

export default function MidiList({ list }) {
  if (list.length === 0) {
    return <p className="empty">No MIDI found</p>;
  }

  return (
    <div>
      <div className="info">
        ✅ Total: <b>{list.length}</b>
      </div>

      <div className="list">
        {list.map((item, i) => (
          <MidiItem key={i} item={item} />
        ))}
      </div>
    </div>
  );
}