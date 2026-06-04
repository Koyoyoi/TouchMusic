import { useEffect, useState } from "react";

/* 排序 */
function sortByTitle(data) {
  return [...data].sort((a, b) => {
    const titleA = a.title?.toUpperCase() || "";
    const titleB = b.title?.toUpperCase() || "";
    return titleA < titleB ? -1 : titleA > titleB ? 1 : 0;
  });
}

export default function MidiList() {
  const [midiList, setMidiList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadFiles();
  }, []);

  async function loadFiles() {
    let page = 1;
    let allItems = [];

    setLoading(true);
    setError("");

    try {
      while (true) {
        const url = `https://imuse.ncnu.edu.tw/Midi-library/api/midis?page=${page}&limit=100&sort=uploaded_at&order=desc`;

        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const json = await res.json();
        const items = Array.isArray(json.items) ? json.items : [];

        if (items.length === 0) break;

        allItems = [...allItems, ...items];
        page++;

        await new Promise((r) => setTimeout(r, 200));
      }

      const sorted = sortByTitle(allItems);
      setMidiList(sorted);
      setFilteredList(sorted);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function getEvents(mid) {
    console.log(mid);
    alert(`點擊：${mid.title}`);
  }

  return (
    <div className="list-ctn">

      {loading && <p>載入中...</p>}
      {error && <p style={{ color: "red" }}>❌ {error}</p>}

      {/* 卡片區 */}
      <div className="card-grid">
        {filteredList.map((mid, idx) => (
          <div
            key={mid.id || idx}
            className="midi-card"
            onClick={() => getEvents(mid)}
          >
            <div className="card-title">
              {mid.title || "No Title"}
            </div>

            <div className="card-composer">
              {mid.composer || "未知作曲者"}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}