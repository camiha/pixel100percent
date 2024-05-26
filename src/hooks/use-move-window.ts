import { LogicalPosition, appWindow } from "@tauri-apps/api/window";
import { useEffect } from "react";

export const useMoveWindow = () => {
	const handleKeyDown = async (event: KeyboardEvent) => {
		if (!event.altKey) return;

		event.preventDefault();
		const { x, y } = await appWindow.outerPosition();
		switch (event.key) {
			case "ArrowUp":
				if (event.shiftKey) {
					await appWindow.setPosition(new LogicalPosition(x, y - 10));
					break;
				}
				await appWindow.setPosition(new LogicalPosition(x, y - 1));
				break;
			case "ArrowDown":
				if (event.shiftKey) {
					await appWindow.setPosition(new LogicalPosition(x, y + 10));
					break;
				}
				await appWindow.setPosition(new LogicalPosition(x, y + 1));
				break;
			case "ArrowLeft":
				if (event.shiftKey) {
					await appWindow.setPosition(new LogicalPosition(x - 10, y));
					break;
				}
				await appWindow.setPosition(new LogicalPosition(x - 1, y));
				break;
			case "ArrowRight":
				if (event.shiftKey) {
					await appWindow.setPosition(new LogicalPosition(x + 10, y));
					break;
				}
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
