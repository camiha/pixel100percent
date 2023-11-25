module.exports = {
	packagerConfig: {
		icon: "src-electron/images/icon",
	},
	rebuildConfig: {},
	makers: [
		{
			name: "@electron-forge/maker-squirrel",
			config: {},
		},
		{
			name: "@electron-forge/maker-zip",
			platforms: ["darwin"],
		},
		{
			name: "@electron-forge/maker-deb",
			config: {},
		},
		{
			name: "@electron-forge/maker-rpm",
			config: {},
		},
	],
	plugins: [
		{
			name: "@electron-forge/plugin-vite",
			config: {
				build: [
					{
						entry: "src-electron/main.ts",
						config: "vite.main.config.ts",
					},
					{
						entry: "src-electron/preload.ts",
						config: "vite.preload.config.ts",
					},
				],
				renderer: [
					{
						name: "main_window",
						config: "vite.renderer.config.ts",
					},
				],
			},
		},
	],
};
