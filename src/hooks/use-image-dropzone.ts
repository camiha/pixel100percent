import { useState } from "react";

export const useImageDropzone = () => {
	const [imageData, setImageData] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const handleOnDrop = <T extends File,>(acceptedFiles: T[]) => {
		setIsLoading(true);

		const acceptedFile = acceptedFiles[0];
		if (!acceptedFile.type.includes("image/")) {
			setIsLoading(false);
			return;
		}
		const reader = new FileReader();
		reader.readAsDataURL(acceptedFile);
		reader.onload = () => {
			if (typeof reader.result !== "string") {
				setIsLoading(false);
				return;
			}
			setImageData(reader.result);
			setIsLoading(false);
		};
	};

	return {
		isLoading,
		imageData,
		handleOnDrop,
		setImageData,
	};
};
