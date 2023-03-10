import {useState, useEffect} from "react";
import './App.css';

function App() {
  const [postcode, setPostcode] = useState("");
  const [post, setPost] = useState("検索中...");

  useEffect(() => {
    (async() => {
      await getCSV();
    })();
  }, []);

  // これuseEffectごとにやるの凄まじいコストかけてない！？
  async function getCSV(){
    const str = "9503122";
    let req = new XMLHttpRequest();
    req.open("get", "KEN_ALL.csv", true);
    req.send(null);
    req.onload = function() {
      getPostcode(req.responseText, str);
    }
    setPostcode(str);
  }

  function getPostcode(str, code){
    let tmp = str.split("\n");
    // 18MBのCSVに向かって O(n) 処理するのムズムズする しかもこれ今後複数回呼ばれそう
    tmp.forEach(element => {
      let el = element.replace(/"/g, "");
      let result = el.split(",");
      if(result[2] === code) {
        setPost(result[6] + result[7] + result[8]);
        return;
      }
    })
  }

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
