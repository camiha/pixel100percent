export {};

declare global {
	interface Window {
		pixelcompleteApi: {
			openGithubRepo: () => Promise<void>;
		};
	}
}
