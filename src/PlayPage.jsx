import { useRef } from "react";
import usePlayPage from "./usePlayPage";

export default function Player({
  midi,
  onBack,
}) {
  const canvasRef = useRef(null);

  usePlayPage(canvasRef, midi);

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
        {midi?.composer}
      </p>

      <canvas ref={canvasRef} />
    </div>
  );
}