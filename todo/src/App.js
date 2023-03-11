import React, {Component} from 'react';
import './App.css';

class App extends Component {
  state = {
    list: [{id:0, value: "Todoの中身を埋める"}]
  };

  constructor(prop){
    super();
    this.todoRef = React.createRef();
    this.create();
  }

  componentDidMount(){
    this.select();
  }

  async create(){
    await window.electronAPI.execSql("create");
  }

  async insert(e){
    const val = this.todoRef.current.value;
    await window.electronAPI.execSql("insert", val);
  }

  async select(){
    const rows = await window.electronAPI.execSql("select");
    let array = [];
    rows.forEach(element => {
      array.push({id: element.id, value: element.todo})
    })
    this.setState({list: array});
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
