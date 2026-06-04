export default function SearchBox({ search, setSearch }) {
  return (
    <input
      className="search"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      placeholder="Search MIDI..."
    />
  );
}