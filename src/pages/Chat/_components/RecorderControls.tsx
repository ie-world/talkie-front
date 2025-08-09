import MicOff from "../_components/MicOff";
import MicOn from "../_components/MicOn";

interface RecorderControlsProps {
  isListening: boolean;
  onStart: () => void;
  onStop: () => void;
}

export const RecorderControls = ({
  isListening,
  onStart,
  onStop,
}: RecorderControlsProps) => (
  <div className="text-center mt-auto">
    {!isListening ? (
      <button onClick={onStart}>
        <MicOff />
      </button>
    ) : (
      <MicOn onStopClick={onStop} onSendClick={onStop} />
    )}
  </div>
);
