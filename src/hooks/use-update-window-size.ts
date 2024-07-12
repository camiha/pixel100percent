import { useState } from "react";
import { LogicalSize, appWindow } from "@tauri-apps/api/window";

export const useUpdateWindowSize = () => {
  // TODO: 初期値は現在のサイズを取得
  const [height, setHeight] = useState(1000);
  const handleOnChangeInputHeight = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(event.target.value) ?? 0;
    if (100 < value || value < 9999) setHeight(value);
  };
  const handleOnBlurInputHeight = (event: React.FocusEvent<HTMLInputElement>) => {
    const value = Number.parseInt(event.target.value) ?? 0;
    if (value < 100) setHeight(100);
    if (9999 < value) setHeight(9999);
  };
  // TODO: 初期値は現在のサイズを取得
  const [width, setWidth] = useState(750);
  const handleOnChangeInputWidth = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(event.target.value) ?? 0;
    if (100 < value || value < 9999) setWidth(value);
  };
  const handleOnBlurInputWidth = (event: React.FocusEvent<HTMLInputElement>) => {
    const value = Number.parseInt(event.target.value) ?? 0;
    if (value < 100) setWidth(100);
    if (9999 < value) setWidth(9999);
  };

  const handleUpdateWindowSize = async () => {
    await appWindow.setSize(new LogicalSize(width, height));
  };

  return {
    height,
    width,
    handleOnChangeInputHeight,
    handleOnBlurInputHeight,
    handleOnChangeInputWidth,
    handleOnBlurInputWidth,
    handleUpdateWindowSize,
  }
};
