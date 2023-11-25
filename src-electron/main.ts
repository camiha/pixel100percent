declare const MAIN_WINDOW_VITE_DEV_SERVER_URL: string;
declare const MAIN_WINDOW_VITE_NAME: string;

import path from "path";
import { BrowserWindow, Menu, app, ipcMain, shell } from "electron";

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
	app.quit();
}

const createWindow = () => {
	// Create the browser window.
	const mainWindow = new BrowserWindow({
		width: 750,
		minWidth: 300,
		height: 600,
		minHeight: 300,
		title: "pixelcomplete",
		webPreferences: {
			preload: path.join(__dirname, "preload.js"),
		},
		transparent: true,
		frame: false,
	});

	// and load the index.html of the app.
	if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
		mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
	} else {
		mainWindow.loadFile(
			path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`),
		);
	}

	// Open the DevTools.
	// mainWindow.webContents.openDevTools();

	mainWindow.setAlwaysOnTop(true, "floating");
	mainWindow.webContents.on("before-input-event", (event, input) => {
		if (input.type === "keyDown") {
			const pos = mainWindow.getPosition();
			switch (input.key) {
				case "ArrowUp":
					mainWindow.setPosition(pos[0], pos[1] - 1);
					break;
				case "ArrowDown":
					mainWindow.setPosition(pos[0], pos[1] + 1);
					break;
				case "ArrowLeft":
					mainWindow.setPosition(pos[0] - 1, pos[1]);
					break;
				case "ArrowRight":
					mainWindow.setPosition(pos[0] + 1, pos[1]);
					break;
			}
		}
	});
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", () => {
	createWindow();

	ipcMain.handle("open-github-repo", () => {
		shell.openExternal("https://github.com/camiha/pixelcomplete");
	});
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
	}
});

app.on("activate", () => {
	// On OS X it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

// Create the application menu
const menu = Menu.buildFromTemplate([
	{
		label: "File",
		submenu: [
			{
				label: "New Window",
				accelerator: "CmdOrCtrl+N", // Shortcut for "Cmd + N" on macOS and "Ctrl + N" on Windows
				click() {
					createWindow();
				},
			},
			{
				label: "Close Window",
				accelerator: "CmdOrCtrl+W",
				click() {
					if (BrowserWindow.getAllWindows().length !== 0) {
						const target = BrowserWindow.getFocusedWindow();
						if (target) {
							target.close();
						}
					}
				},
			},
			{
				label: "Quit",
				accelerator: "CmdOrCtrl+Q",
				click() {
					app.quit();
				},
			},
		],
	},
]);

Menu.setApplicationMenu(menu);
