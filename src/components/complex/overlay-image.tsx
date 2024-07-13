import type { FC } from "react";

export const OverlayImage: FC<{ src: string; isInvert: boolean }> = ({
	src,
	isInvert,
}) => {
	if (isInvert) {
		return (
			<img
				data-tauri-drag-region
				src={src}
				alt=""
				className="w-full h-full invert"
			/>
		);
	}

	return (
		<img data-tauri-drag-region src={src} alt="" className="w-full h-full" />
	);
};
