import { LogicalPosition, appWindow } from "@tauri-apps/api/window";
import { useEffect } from "react";

export const useKeydown = () => {
  const handleKeyDown = async (event: KeyboardEvent) => {
    // if (!event.altKey) return;

    event.preventDefault();
    const { x, y } = await appWindow.outerPosition();
    switch (event.key) {
      case "h":
        await appWindow.setPosition(new LogicalPosition(x - 1, y));
        break;
      case "H":
        await appWindow.setPosition(new LogicalPosition(x - 10, y));
        break;
      case "j":
        await appWindow.setPosition(new LogicalPosition(x, y + 1));
        break;
      case "J":
        await appWindow.setPosition(new LogicalPosition(x, y + 10));
        break;
      case "k":
        await appWindow.setPosition(new LogicalPosition(x, y - 1));
        break;
      case "K":
        await appWindow.setPosition(new LogicalPosition(x, y - 10));
        break;
      case "l":
        await appWindow.setPosition(new LogicalPosition(x + 1, y));
        break;
      case "L":
        await appWindow.setPosition(new LogicalPosition(x + 10, y));
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
    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  }, [handleKeyDown]);
};
