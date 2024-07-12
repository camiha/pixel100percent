import { useCallback, useEffect } from "react";
import { appWindow, LogicalPosition } from "@tauri-apps/api/window";
import { exit } from '@tauri-apps/api/process';

type UseKeyDownCallback = (
  code: string,
  modifiers: { ctrl: boolean; shift: boolean; meta: boolean }
) => boolean;

export const useKeydown = (callback: UseKeyDownCallback) => {
  const onKeydown = useCallback(
    (event: KeyboardEvent) => {
      const consumed = callback(event.code, {
        ctrl: event.ctrlKey,
        shift: event.shiftKey,
        meta: event.metaKey,
      });

      const e = event.composedPath()[0];
      if (
        !(e instanceof HTMLInputElement || e instanceof HTMLAreaElement) ||
        consumed
      ) {
        if (event.metaKey && event.code === "KeyW") {
          (async() => {
            await appWindow.close();
          })();
        }
        else if(event.metaKey && event.code === "KeyQ") {
          exit(0);
        }
        // https://github.com/tauri-apps/tauri/issues/7139
        else if(event.shiftKey && event.code === "KeyH") {
          (async() => {
            const { x, y } = await appWindow.outerPosition();
            await appWindow.setPosition(new LogicalPosition(x - 10, y));
          })();
        }
        else if(event.shiftKey && event.code === "KeyJ") {
          (async() => {
            const { x, y } = await appWindow.outerPosition();
            await appWindow.setPosition(new LogicalPosition(x, y + 10));
          })();
        }
        else if(event.shiftKey && event.code === "KeyK") {
          (async() => {
            const { x, y } = await appWindow.outerPosition();
            await appWindow.setPosition(new LogicalPosition(x, y - 10));
          })();
        }
        else if(event.shiftKey && event.code === "KeyL") {
          (async() => {
            const { x, y } = await appWindow.outerPosition();
            await appWindow.setPosition(new LogicalPosition(x + 10, y));
          })();
        }
        else if (event.code === "KeyH") {
          (async() => {
            const { x, y } = await appWindow.outerPosition();
            await appWindow.setPosition(new LogicalPosition(x - 1, y));
          })();
        }
        else if (event.code === "KeyJ") {
          (async() => {
            const { x, y } = await appWindow.outerPosition();
            await appWindow.setPosition(new LogicalPosition(x, y + 1));
          })();
        }
        else if (event.code === "KeyK") {
          (async() => {
            const { x, y } = await appWindow.outerPosition();
            await appWindow.setPosition(new LogicalPosition(x, y - 1));
          })();
        }
        else if (event.code === "KeyL") {
          (async() => {
            const { x, y } = await appWindow.outerPosition();
            await appWindow.setPosition(new LogicalPosition(x + 1, y));
          })();
        }

        // TODO: fix beep sound
      }
    },
    [callback]
  );

  useEffect(() => {
    window.addEventListener("keydown", onKeydown);
    return () => {
      window.removeEventListener("keydown", onKeydown);
    };
  }, [onKeydown]);
};

export const useKeydownOverlay = () => {
  const callback = (
    code: string,
    modifiers: { ctrl: boolean; shift: boolean; meta: boolean }
  ) => {
    return true;
  };
  useKeydown(callback);
};
