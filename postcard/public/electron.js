const {app, BrowserWindow, dialog, ipcMain, Menu} = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');
const prompt = require("electron-prompt");
const fs = require("fs")

let mainWindow = null;

function exportPDF(){
  dialog.showSaveDialog(mainWindow, {
    filters: [
      {name: "PDF file", extensions: ["pdf"]}
    ]
  }).then(result => {
    if(!result.canceled){
      printPDF(result.filePath);
    }
  }).catch(err => {
    console.log(err);
  })
}

function printPDF(filename) {
  // なんかクソデカ画面にクソ小さい文字で吐き出されるけどこれ本当に合ってるんか
  mainWindow.webContents.printToPDF({
    pageSize: {width: 100000, height: 148000},
    scaleFactor: 72,
    printBackground: true
  }).then(data => {
    fs.writeFile(filename, data, (error) => {
      if(error) throw error;
      console.log("write PDF OK")
    })
  }).catch(error => {
    throw error;
  })
}

const isMac = (process.platform === 'darwin');

const template = Menu.buildFromTemplate([
  ...(isMac ? [{
    label: app.name,
    submenu: [
      {role: "about", label: `${app.name}について`},
      {type: "separator"},
      {role: "quit", label: `${app.name}を終了`}
    ]
  }] : []), {
    label: "ファイル",
    submenu: [
      {label: "PDF書き出し", click: () => exportPDF()},
    ]
  }, {
    label: "表示",
    submenu: [
      {role: "reload", label: "再読み込み"},
      {role: "forceReload", label: "強制的に再読み込み"},
      {role: "toggleDevTools", label: "開発者ツールを表示"},
    ]
  }
]);

Menu.setApplicationMenu(template);

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })
  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, "../build/index.html")}`);
  if(isDev){
    mainWindow.webContents.openDevTools();
  }
}

app.whenReady().then(()=>{
  ipcMain.handle("prompt", handleOpenPrompt);
  createWindow();
  app.on('activate', function(){
    if(BrowserWindow.getAllWindows().length === 0) {createWindow()}
  })
})

app.on("window-all-closed", function(){
  if(process.platform !== 'darwin'){
    app.quit();
  }
})

async function handleOpenPrompt(){
  // サンプルだとこれグローバル変数に入れてたけど意図通りじゃない気がする
  let result = "";
  await prompt({
    title: "郵便番号検索",
    label: "郵便番号を入れてね",
    value: "9503122",
    type: "input",
    inputAttrs: {type: "text", required: true}
  })
  .then((r)=>{
    result = r;
  })
  .catch(console.error);
  return result;
}
