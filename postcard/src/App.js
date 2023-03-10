import {useState} from "react";
import './App.css';

function App() {
  const [postcode, setPosecode] = useState("");
  const [post, setPost] = useState("検索中...");

  return (
    <div className="App">
      <div className="to-code">大西 〇〇</div>
      <div className="from-name">香川</div>
      <div className="from-post">研究所様</div>
      <div className="to-post">{post}</div>
      <div className="from-code">7660023</div>
    </div>
  );
}

export default App;
