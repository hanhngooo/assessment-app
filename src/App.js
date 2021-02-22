import { useState } from "react";
import "./App.css";
import AddText from "./components/AddText";
import PasswordValidation from "./components/PasswordValidation";

function App() {
  const questions = [<AddText />, <PasswordValidation />];
  const [current, setCurrent] = useState(0);

  return (
    <div className="App">
      <div>
        <button onClick={() => setCurrent(0)}>Question 1</button>
        <button onClick={() => setCurrent(1)}>Question 2</button>
      </div>
      <div className="wrapper">{questions[current]}</div>
    </div>
  );
}

export default App;
