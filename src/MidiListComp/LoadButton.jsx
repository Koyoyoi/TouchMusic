export default function LoadButton({ setMidiList, setLoading }) {

  async function loadData() {
    setLoading(true);

    try {
      let page = 1;
      let all = [];

      while (true) {
        const res = await fetch(
          `https://imuse.ncnu.edu.tw/Midi-library/api/midis?page=${page}&limit=100&sort=uploaded_at&order=desc`
        );

        const json = await res.json();
        const items = json.items || [];

        if (items.length === 0) break;

        all = [...all, ...items];
        page++;

        await new Promise((r) => setTimeout(r, 200));
      }

      setMidiList(all);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  }

  return (
    <button className="btn" onClick={loadData}>
      Load MIDI
    </button>
  );
}