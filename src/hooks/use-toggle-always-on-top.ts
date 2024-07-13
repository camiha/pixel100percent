import { register } from "@tauri-apps/api/globalShortcut";
import { useEffect } from "react";
import { appWindow } from "@tauri-apps/api/window";
import { useState } from "react";
import { unregister } from "@tauri-apps/api/globalShortcut";

export const useToggleAlwaysOnTop = () => {
	const [isAlwaysOnTop, setIsAlwaysOnTop] = useState(true);

	useEffect(() => {
		(async () => {
			await unregister("Alt+A");
			await register("Alt+A", async () => {
				setIsAlwaysOnTop(!isAlwaysOnTop);
				await appWindow.setAlwaysOnTop(isAlwaysOnTop);
			});
		})();
	}, [isAlwaysOnTop]);

	return {
		isAlwaysOnTop,
	};
};
