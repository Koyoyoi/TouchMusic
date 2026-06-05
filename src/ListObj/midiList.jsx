import { useEffect, useState } from "react";

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

  async function getEvents(mid) {
    try {
      console.log("下載中...", mid);

      const url = `https://imuse.ncnu.edu.tw/Midi-library/api/midis/${mid.id}/events`;

      const res = await fetch(url);

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const json = await res.json();

      console.log("MIDI Events:", json);

      if (Array.isArray(json.events)) {
        const groups = new Map();

        // 建立歌詞索引
        const lyricMap = new Map();

        json.lyrics?.forEach((lyric) => {
          const t = Math.floor(lyric.time * 1e6) / 1e6;
          lyricMap.set(t, lyric.text);
        });

        json.events.forEach((ev) => {
          if (ev.channel !== 0) return;

          const t = Math.floor(ev.time * 1e6) / 1e6;

          if (!groups.has(t)) {
            groups.set(t, {
              lyrics: lyricMap.get(t) || "",
              notes: {},
            });
          }

          groups.get(t).notes[ev.midi] = ev;
        });

        const midiEvent = [...groups.entries()]
          .sort((a, b) => a[0] - b[0])
          .map((entry) => entry[1]);

        console.log("整理後資料:", midiEvent);

        alert(
          `${mid.title}\n共載入 ${midiEvent.length} 個時間事件`
        );
      }
    } catch (err) {
      console.error(err);
      alert(`❌ 載入失敗：${err.message}`);
    }
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