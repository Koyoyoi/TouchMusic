import { useEffect, useState } from "react";

function sortByTitle(data) {
  return [...data].sort((a, b) => {
    const titleA = a.title?.toUpperCase() || "";
    const titleB = b.title?.toUpperCase() || "";

    if (titleA < titleB) return -1;
    if (titleA > titleB) return 1;
    return 0;
  });
}

export default function MidiList({
  searchText,
  onSelectMidi,
}) {
  const [midiList, setMidiList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadFiles();
  }, []);

  useEffect(() => {
    const keyword = searchText.toLowerCase().trim();

    if (!keyword) {
      setFilteredList(midiList);
      return;
    }

    const result = midiList.filter((mid) => {
      return (
        mid.title?.toLowerCase().includes(keyword) ||
        mid.composer?.toLowerCase().includes(keyword)
      );
    });

    setFilteredList(result);
  }, [searchText, midiList]);

  async function loadFiles() {
    let page = 1;
    let allItems = [];

    setLoading(true);
    setError("");

    try {
      while (true) {
        const url =
          `https://imuse.ncnu.edu.tw/Midi-library/api/midis?page=${page}&limit=100&sort=uploaded_at&order=desc`;

        const res = await fetch(url);

        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }

        const json = await res.json();

        const items = Array.isArray(json.items)
          ? json.items
          : [];

        if (items.length === 0) break;

        allItems.push(...items);

        page++;

        await new Promise((r) =>
          setTimeout(r, 200)
        );
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

  async function openMidi(mid) {
    try {
      const url =
        `https://imuse.ncnu.edu.tw/Midi-library/api/midis/${mid.id}/events`;

      const res = await fetch(url);

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const json = await res.json();

      const midiData = {
        ...mid,
        events: json.events || [],
        lyrics: json.lyrics || [],
      };

      onSelectMidi(midiData);

    } catch (err) {
      console.error(err);
      alert(`載入失敗：${err.message}`);
    }
  }

  return (
    <div className="list-ctn">

      {loading && <p>載入中...</p>}

      {error && (
        <p style={{ color: "red" }}>
          ❌ {error}
        </p>
      )}

      <div className="card-grid">
        {filteredList.map((mid, idx) => (
          <div
            key={mid.id || idx}
            className="midi-card"
            onClick={() => openMidi(mid)}
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