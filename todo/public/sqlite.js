const sqlite3 = require("sqlite3").verbose();

class SQLite {
  constructor(dbFileName){
    this.db = new sqlite3.Database(dbFileName);
  }

  run(sql, param){
    const p = new Promise((ok, ng) => {
      this.db.run(sql, param, (err, res) => {
        let id = this.id || -1;
        let change = this.change || -1;
        if(err) {
          ng(new Error(err));
        }
        else{
          ok({id: id, change: change});
        }
      })
    })
    return p;
  }
  
  all(sql, param) {
    const p = new Promise((ok, ng) => {
      this.db.all(sql, param, (err, res) => {
        if(err) {
          ng(new Error(err));
        }
        else{
          console.log(res)
          ok(res);
        }
      })
    });
    return p;
  }
}

module.exports = SQLite;