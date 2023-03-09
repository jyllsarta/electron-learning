import React, {Component} from 'react';
import './App.css';

class App extends Component {
  state = {
    list: [{id:0, value: "Todoの中身を埋める"}]
  };

  constructor(prop){
    super();
    this.todoRef = React.createRef();
  }

  insert(e){
    let array = this.state.list;
    const id  = this.state.list.length;
    const val = this.todoRef.current.value;
    array.push({id: id, value: val});
    this.setState({list: array})
  }

  render(){
    return <div className="App">
    <table>
      <thead>
        <tr>
          <td>
            <button onClick={this.insert.bind(this)}>
              追加
            </button>
          </td>
          <td>
            <input type="text" ref={this.todoRef} size="50" />
          </td>
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
