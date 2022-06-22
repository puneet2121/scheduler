
import { useState} from "react";
export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(mode) {  
    setMode(mode)
    setHistory([...history, mode])
  }
  function back() {
    const historyCopy = [...history]
    historyCopy.pop()
    setMode(historyCopy[historyCopy.length - 1 ])
    setHistory(historyCopy)
  }
  return { mode,transition,back };
}



// const [mode, setMode] = useState(initial);
// const [history, setHistory] = useState([]);

// function transition(nextMode) {  
//   setMode(nextMode)
//   setHistory([...history, mode])
// }
// function back(mode) {
//   const historyCopy = [...history]
//   console.log(historyCopy)
//   mode = historyCopy.pop()
//   setMode(mode)
//   setHistory(historyCopy)
//   console.log(historyCopy)
//   console.log(mode)
// }
// return { mode,transition,back };
// }