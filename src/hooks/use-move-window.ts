import { LogicalPosition, appWindow } from "@tauri-apps/api/window";
import { useEffect } from "react";

export const useMoveWindow = () => {
	const handleKeyDown = async (event: KeyboardEvent) => {
		if (!event.altKey) return;

		event.preventDefault();
		const { x, y } = await appWindow.outerPosition();
		switch (event.key) {
			case "ArrowUp":
				await appWindow.setPosition(new LogicalPosition(x, y - 1));
				break;
			case "ArrowDown":
				await appWindow.setPosition(new LogicalPosition(x, y + 1));
				break;
			case "ArrowLeft":
				await appWindow.setPosition(new LogicalPosition(x - 1, y));
				break;
			case "ArrowRight":
				await appWindow.setPosition(new LogicalPosition(x + 1, y));
				break;
			default:
				return;
		}
	};

	useEffect(() => {
		window.addEventListener("keydown", handleKeyDown);

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [handleKeyDown]);
};
