import {useState} from "react";
import './App.css';

function App() {
  const [images, setImages] = useState([]);

  return (
    <div className="App">
      <header>
        <h1>画像検索ワード</h1>
      </header>
      <div>
        {images.map((src, i)=><img src={src} key={i} alt="問題"/>)}
      </div>

      <p>
        <a href="https://pixabay.com" target="_blank" rel="noreferrer">
          <img src="https://pixabay.com/static/img/logo.svg" alt="pixabay" />
        </a>
      </p>
    </div>
  );
}

export default App;
