import { app, BrowserWindow, ipcMain, globalShortcut, Tray, Menu, screen } from 'electron';
import path from 'path';

let mainWindow: BrowserWindow | null = null;
let splashWindow: BrowserWindow | null = null;
let widgetWindow: BrowserWindow | null = null;
let tray: Tray | null = null;

const isDev = process.env.NODE_ENV === 'development';

function createSplashWindow() {
  splashWindow = new BrowserWindow({
    width: 500,
    height: 350,
    transparent: true,
    frame: false,
    alwaysOnTop: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  if (isDev) {
    splashWindow.loadURL('http://localhost:5173/splash.html');
  } else {
    splashWindow.loadFile(path.join(__dirname, '../dist/splash.html'));
  }
}

function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    show: false,
    backgroundColor: '#09090b',
    titleBarStyle: 'hidden',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  if (isDev) {
    mainWindow.loadURL('http://localhost:5173');
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }

  mainWindow.once('ready-to-show', () => {
    if (splashWindow) {
      setTimeout(() => {
        splashWindow?.close();
        mainWindow?.show();
      }, 3000); // 3 second splash for effect
    } else {
      mainWindow?.show();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

function createWidgetWindow() {
  const { width } = screen.getPrimaryDisplay().workAreaSize;
  
  widgetWindow = new BrowserWindow({
    width: 600,
    height: 80,
    x: Math.floor((width - 600) / 2),
    y: 100,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    show: false,
    skipTaskbar: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  if (isDev) {
    widgetWindow.loadURL('http://localhost:5173/widget.html');
  } else {
    widgetWindow.loadFile(path.join(__dirname, '../dist/widget.html'));
  }
}

function toggleWidget() {
  if (!widgetWindow) {
    createWidgetWindow();
  }

  if (widgetWindow?.isVisible()) {
    widgetWindow.hide();
  } else {
    widgetWindow?.show();
    widgetWindow?.focus();
  }
}

function createTray() {
  const iconPath = path.join(__dirname, '../src/assets/logo.png'); // Need to create this
  tray = new Tray(iconPath);
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Show App', click: () => mainWindow?.show() },
    { label: 'Toggle Widget (Alt+Space)', click: () => toggleWidget() },
    { type: 'separator' },
    { label: 'Quit', click: () => app.quit() },
  ]);
  tray.setToolTip('Whisperflow Elite');
  tray.setContextMenu(contextMenu);
}

app.whenReady().then(() => {
  createSplashWindow();
  createMainWindow();
  createWidgetWindow();
  createTray();

  // Register Global Shortcut
  globalShortcut.register('Alt+Space', () => {
    toggleWidget();
  });

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('will-quit', () => {
  globalShortcut.unregisterAll();
});

// IPC Handlers
ipcMain.handle('get-app-version', () => app.getVersion());
ipcMain.on('close-widget', () => widgetWindow?.hide());
ipcMain.on('minimize-main', () => mainWindow?.minimize());
ipcMain.on('close-main', () => mainWindow?.hide()); // Hide instead of close to keep tray alive
