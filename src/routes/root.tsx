import { invoke } from "@tauri-apps/api";
import { convertFileSrc } from "@tauri-apps/api/tauri";
import { useStoredImage } from "@/hooks/use-load-image";
import { Button } from "@/components/ui/button";

export const Root = () => {
  const { imageCollection, handleRemoveImage } = useStoredImage();
  const openWindow = async (filePath: string) => {
    await invoke("create_window", { filePath });
  };

  return (
    <div className="relative">
      <div className="bg-white h-screen p-4">
        {imageCollection.length > 0 && (
          <ul className="auto-grid-48 gap-2">
            {imageCollection.map((image) => (
              <li key={image.file_path} className="w-full">
                <p>{image.file_name}</p>
                <button
                  type="button"
                  onClick={() => {
                    openWindow(image.file_path);
                  }}
                >
                  <img
                    className="w-full object-cover object-top h-64"
                    src={convertFileSrc(image.file_path)}
                    alt=""
                    data-tauri-drag-region
                  />
                </button>
                <Button
                  onClick={() => {
                    handleRemoveImage(image.file_path);
                  }}
                >
                  Remove
                </Button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
