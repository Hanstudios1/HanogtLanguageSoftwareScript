const { app, BrowserWindow, shell, protocol, net } = require('electron');
const path = require('path');
const url = require('url');

// Custom protocol for serving static files
function createProtocol() {
    protocol.handle('app', (request) => {
        const requestUrl = request.url.substring('app://'.length);
        const decodedUrl = decodeURIComponent(requestUrl);
        const filePath = path.join(__dirname, '..', 'out', decodedUrl);
        return net.fetch(url.pathToFileURL(filePath).toString());
    });
}

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

    // Load the production build
    const indexPath = path.join(__dirname, '../out/index.html');
    mainWindow.loadFile(indexPath);

    // Open external links in the default browser
    mainWindow.webContents.setWindowOpenHandler(({ url }) => {
        if (url.startsWith('http://') || url.startsWith('https://')) {
            shell.openExternal(url);
            return { action: 'deny' };
        }
        return { action: 'allow' };
    });

    // Handle navigation for internal links
    mainWindow.webContents.on('will-navigate', (event, navUrl) => {
        const parsedUrl = new URL(navUrl);
        if (parsedUrl.protocol === 'http:' || parsedUrl.protocol === 'https:') {
            if (!navUrl.includes('localhost')) {
                event.preventDefault();
                shell.openExternal(navUrl);
            }
        }
    });
}

app.whenReady().then(() => {
    createProtocol();
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
