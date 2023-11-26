import { useState } from "react";

export const useOpacitySlider = () => {
	const [imageOpacity, setImageOpacity] = useState(1);

	const handleOnValueChange = (value: number) => {
		setImageOpacity(value / 100);
	};

	return {
		imageOpacity,
		handleOnValueChange,
		setImageOpacity,
	};
};
