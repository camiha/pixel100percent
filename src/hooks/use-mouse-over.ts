import { useState } from "react";

export const useMouseOver = () => {
	const [isMouseOver, setIsMouseOver] = useState(false);

	const handleMouseOver = () => {
		setIsMouseOver(true);
	};

	const handleMouseLeave = () => {
		setIsMouseOver(false);
	};

	return {
		isMouseOver,
		handleMouseOver,
		handleMouseLeave,
	};
};
