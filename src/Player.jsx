import { useEffect } from "react";

export default function Player({
  midi,
  onBack,
}) {

  useEffect(() => {
    console.log("載入 MIDI", midi);

    console.log(
      "events:",
      midi.events?.length
    );
  }, [midi]);

  return (
    <div className="player-page">

      <button
        className="back-btn"
        onClick={onBack}
      >
        ← Back
      </button>

      <h1>
        {midi?.title}
      </h1>

      <p>
        Composer:
        {" "}
        {midi?.composer}
      </p>

      <p>
        Events:
        {" "}
        {midi?.events?.length || 0}
      </p>

      <canvas id="piano-roll" />

    </div>
  );
}