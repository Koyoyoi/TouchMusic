export default function MidiItem({ item }) {
  return (
    <div
      className="card"
      onClick={() => console.log(item)}
    >
      <div className="title">{item.title}</div>
      <div className="composer">
        {item.composer || "Unknown"}
      </div>
    </div>
  );
}