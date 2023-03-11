const {contextBridge, ipcRenderer} = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  execSql: (sql, param) => ipcRenderer.invoke("executeSql", sql, param)
})
