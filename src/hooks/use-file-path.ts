import { convertFileSrc } from "@tauri-apps/api/tauri";

export const useFilePath = () => {
  const url = new URL(window.location.href);
  const filePath = url.searchParams.get("file_path");
  if (!filePath) {
    throw new Error("file_path is not found");
  }
  const fileSrc = convertFileSrc(filePath);

  return {
    fileSrc,
  };
};
