const { app, BrowserWindow, shell } = require('electron');
const path = require('path');

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 1400,
        height: 900,
        minWidth: 800,
        minHeight: 600,
        icon: path.join(__dirname, '../public/logo-dark.png'),
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true
        },
        titleBarStyle: 'default',
        autoHideMenuBar: true
    });

    // Load the production URL or local dev server
    const isProd = !process.env.ELECTRON_DEV;

    if (isProd) {
        // In production, load from the local static files
        mainWindow.loadFile(path.join(__dirname, '../out/index.html'));
    } else {
        // In development, load from Next.js dev server
        mainWindow.loadURL('http://localhost:3000');
    }

    // Open external links in the default browser
    mainWindow.webContents.setWindowOpenHandler(({ url }) => {
        shell.openExternal(url);
        return { action: 'deny' };
    });

    // Navigate internal links correctly
    mainWindow.webContents.on('will-navigate', (event, url) => {
        const parsedUrl = new URL(url);
        if (parsedUrl.hostname !== 'localhost' && !parsedUrl.protocol.startsWith('file')) {
            event.preventDefault();
            shell.openExternal(url);
        }
    });
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
