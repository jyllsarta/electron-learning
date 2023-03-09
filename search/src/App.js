import {useLayoutEffect, useState} from "react";
import './App.css';

function App() {
  const [images, setImages] = useState([]);
  const MIN_NUM=3;
  const [stage, setStage] = useState(0);
  const [number, setNumber] = useState(MIN_NUM);
  const [title, setTitle] = useState("スタート");

  useLayoutEffect(()=>{
    if(title !== "スタート"){
      addImage(null, stage, number);
    }
  }, [stage, number]);

  const start = (e) => {
    setTitle("画像検索ワード当てクイズ");
    addImage(null, stage, number);
  }

  const addImage = (e, stg, num) => {
    createImage();
  }

  function createImage(json) {
    setImages(["https://webgl.vexil.jp/images/webgl.jpg"]);
  }

  return (
    <div className="App">
      <header>
        <h1 onClick={(e)=> start(e)}>画像検索ワード</h1>
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
