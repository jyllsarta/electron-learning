import {useLayoutEffect, useEffect, useState} from "react";
import './App.css';

function App() {
  const [images, setImages] = useState([]);
  const MIN_NUM=3;
  const [stage, setStage] = useState(0);
  const [number, setNumber] = useState(MIN_NUM);
  const [word, setWord] = useState("");
  const [title, setTitle] = useState("スタート");
  const keywords = ["犬", "ピアノ", "猫", "ギター", "車"];

  useEffect(()=>{
    // ブラウザ版でも読み込んじゃって死んでしまうのでelectron環境じゃないときはこれやらない
    if(!window.electronAPI){
      return;
    }
    // なんか "quiz-start" メッセージ一つに対してこのログが2回流れるんだけど、理由がわからん
    window.electronAPI.onReceiveMessage((e, data)=>{
      console.log(e);
      console.log(data);
      start(e);
    })
  }, []);

  useLayoutEffect(()=>{
    if(title !== "スタート"){
      addImage(null, stage, number);
    }
  }, [stage, number]);

  const start = (e) => {
    console.log("start")
    console.log(e)
    setTitle("画像検索ワード当てクイズ");
    addImage(null, stage, number);
  }

  const answer = (e) => {
    if(keywords[stage] === word){
      setStage((stage + 1) % keywords.length);
      setNumber(MIN_NUM);
    }
    else{
      setNumber(number + 1);
    }
  }

  const addImage = (e, stg, num) => {
    fetch(createURL(keywords[stg], num))
    .then(function(data){
      return data.json();
    })
    .then(function(json){
      createImage(json);
    })
  }

  function createURL(value, num){
    console.log(process.env);
    const API_KEY = process.env.REACT_APP_API_KEY;
    const baseUrl = `https://pixabay.com/api/?key=${API_KEY}`;
    const keyword = `&q=${encodeURIComponent(value)}`;
    const option = `&orientation=horizontal&per_page=${num}`;
    return baseUrl + keyword + option;
  }

  function createImage(json) {
    let array = [];
    if(json.totalHits > 0){
      json.hits.forEach(function(value){
        array.push(value.webformatURL);
      })
      setImages(array);
    }
  }

  return (
    <div className="App">
      <header>
        <h1 onClick={(e)=> start(e)}>画像検索ワード</h1>
        <input type="text"  onChange={(e) => setWord(e.target.value)}/>
        <button onClick={(e) => answer(e)}>答える</button>
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
