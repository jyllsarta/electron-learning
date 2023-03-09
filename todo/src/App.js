import React, {Component} from 'react';
import './App.css';

class App extends Component {
  state = {
    list: [{id:0, value: "Todoの中身を埋める"}]
  };

  constructor(prop){
    super();
  }

  render(){
    return <div className="App">
    <table>
      <thead>
        <tr>
          <td><button>追加</button></td>
          <td></td>
        </tr>
      </thead>
      <tbody>
        {this.state.list.map(item=><tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.value}</td>
          </tr>)}
      </tbody>
    </table>
  </div>
  } 
}

export default App;
