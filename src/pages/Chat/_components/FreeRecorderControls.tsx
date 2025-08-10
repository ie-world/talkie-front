import FreeMicOff from "../_components/FreeMicOff";
import MicOn from "../_components/MicOn";

interface FreeRecorderControlsProps {
  isListening: boolean;
  onStart: () => void;
  onStop: () => void;
}

export const FreeRecorderControls = ({
  isListening,
  onStart,
  onStop,
}: FreeRecorderControlsProps) => (
  <div className="text-center mt-auto">
    {!isListening ? (
      <button onClick={onStart}>
        <FreeMicOff />
      </button>
    ) : (
      <MicOn onStopClick={onStop} onSendClick={onStop} />
    )}
  </div>
);
