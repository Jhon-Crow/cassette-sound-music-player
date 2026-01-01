// Cassette Music Player - Preload Script
// Exposes safe IPC methods to the renderer process

const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods to the renderer
contextBridge.exposeInMainWorld('electronAPI', {
  // File dialogs
  openFolderDialog: () => ipcRenderer.invoke('open-folder-dialog'),
  openFileDialog: () => ipcRenderer.invoke('open-file-dialog'),

  // Window controls
  minimizeWindow: () => ipcRenderer.send('window-minimize'),
  maximizeWindow: () => ipcRenderer.send('window-maximize'),
  closeWindow: () => ipcRenderer.send('window-close'),

  // Tray integration
  updatePlayState: (isPlaying) => ipcRenderer.send('update-play-state', isPlaying),
  onTrayTogglePlay: (callback) => ipcRenderer.on('tray-toggle-play', callback),
  showWindow: () => ipcRenderer.send('show-window')
});
