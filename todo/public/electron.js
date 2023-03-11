const {app, BrowserWindow, ipcMain} = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');
const SQLite = require("./sqlite");

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })
  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, "../build/index.html")}`)
}

app.whenReady().then(()=>{
  createWindow();
  app.on('activate', function(){
    if(BrowserWindow.getAllWindows().length === 0) {createWindow()}
  })
});

app.on("window-all-closed", function(){
  if(process.platform !== 'darwin'){
    app.quit();
  }
});

ipcMain.handle("executeSql", async (e, sql, param) => {
  const db = new SQLite("./todo.db");
  return await execute(db, sql, param);
});

function execute(db, sql, param){
  // すっっごい拡張性の低いコード！
  if (sql === "create"){
    return Promise.resolve().then(()=>{
      db.run(
        `CREATE TABLE IF NOT EXISTS todoTable(id INTEGER PRIMARY KEY AUTOINCREMENT, todo TEXT)`
      )
    })
  }
  else if(sql === "insert"){
    return Promise.resolve().then(()=>{
      db.run(
        `INSERT INTO todoTable(todo) VALUES (?)`,
        param
      )
    })
  }
  else if(sql === "select"){
    return Promise.resolve().then(()=>{
      return db.all(
        `SELECT * FROM todoTable`
      )
    });
  }
  return sql;
}
