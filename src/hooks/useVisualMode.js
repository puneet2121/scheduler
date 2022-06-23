import { useState } from "react";
export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(mode) {
    setMode(mode);
    setHistory([...history, mode]);
  }
  function back() {
    const historyCopy = [...history];
    historyCopy.pop();
    setMode(historyCopy[historyCopy.length - 1]);
    setHistory(historyCopy);
  }
  return { mode, transition, back };
}
