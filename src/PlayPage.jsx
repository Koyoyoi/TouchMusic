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

      <h1 className="midi-title">
        {midi?.title}
      </h1>

      <p className="midi-composer">
        Composer:
        {" "}
        {midi?.composer}
      </p>

      <canvas id="piano-roll" />

    </div>
  );
}