import { Slider } from "@/components/ui/slider";
import { useOpacitySlider } from "@/hooks/use-opacity-slider";
import { invoke } from "@tauri-apps/api";
import { Button } from "./components/ui/button";
import { appWindow } from "@tauri-apps/api/window";
import { useKeydown } from "./hooks/use-keydown";

function App() {
  const { opacity, handleOnValueChange } = useOpacitySlider();
  const openWindow = async () => {
    await invoke("create_window");
  };

  const closeWindow = async () => {
    await appWindow.close();
  };

  useKeydown()

  return (
    <div className="relative">
      <div style={{ opacity }}>
        <div className="bg-white h-screen rounded-xl" data-tauri-drag-region>
          hello
          <Button onClick={openWindow}>open window</Button>
          <Button onClick={closeWindow}>close</Button>
        </div>
      </div>
      <div className="fixed bottom-4 w-48 left-1/2 -translate-x-1/2">
        <Slider
          defaultValue={[100]}
          max={100}
          step={1}
          onValueChange={(values) => {
            handleOnValueChange(values[0]);
          }}
        />
      </div>
    </div>
  );
}

export default App;
