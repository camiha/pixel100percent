import { Slider } from "@/components/ui/slider";
import { useOpacitySlider } from "@/hooks/use-opacity-slider";
import { useKeydownOverlay } from "@/hooks/use-keydown";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useUpdateWindowSize } from "@/hooks/use-update-window-size";
import { useFilePath } from "@/hooks/use-file-path";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export const Overlay = () => {
  const { opacity, handleOnValueChange } = useOpacitySlider();
  const { fileSrc } = useFilePath();
  const {
    height,
    width,
    handleOnChangeInputHeight,
    handleOnBlurInputHeight,
    handleOnChangeInputWidth,
    handleOnBlurInputWidth,
    handleUpdateWindowSize,
  } = useUpdateWindowSize();
  useKeydownOverlay();

  return (
    <div className="relative">
      <div style={{ opacity }}>
        <div className="bg-white min-h-screen min-w-screen">
          <img
            data-tauri-drag-region
            src={fileSrc}
            alt=""
            // className="w-full h-full invert"
            className="w-full h-full"
          />
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
      <div className="fixed bottom-4 left-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">Open popover</Button>
          </PopoverTrigger>
          <PopoverContent collisionPadding={16}>
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <Input
                  type="number"
                  value={height}
                  onChange={handleOnChangeInputHeight}
                  onBlur={handleOnBlurInputHeight}
                />
                <Input
                  type="number"
                  value={width}
                  onChange={handleOnChangeInputWidth}
                  onBlur={handleOnBlurInputWidth}
                />
              </div>
              <Button type="button" onClick={handleUpdateWindowSize}>
                update
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};
