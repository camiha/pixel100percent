import { useState } from "react";

export const useOpacitySlider = () => {
	const [opacity, setOpacity] = useState(1);

	const handleOnValueChange = (value: number) => {
		setOpacity(value / 100);
	};

	return {
		opacity,
		handleOnValueChange,
	};
};